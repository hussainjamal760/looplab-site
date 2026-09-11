import {
  Types,
} from 'mongoose';

import {
  randomBytes,
} from 'crypto';

import {
  Registration,
  IRegistration,
} from './registration.model.js';

import {
  Event,
  IFormField,
} from '../events/event.model.js';

import {
  PromoService,
} from '../promo/promo.service.js';

import {
  CreateRegistrationInput,
  GetRegistrationsQuery,
  UpdateStatusInput,
} from './registration.validation.js';

import {
  ApiError,
  ApiErrorDetail,
} from '../../utils/ApiError.js';

// ==========================================
// TYPES
// ==========================================

interface PaginatedRegistrations {
  data: IRegistration[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ==========================================
// STRING HELPERS
// ==========================================

function normalizeEmail(
  value: unknown
): string {
  return String(value || '')
    .trim()
    .toLowerCase();
}

function normalizePromoCode(
  value:
    | string
    | null
    | undefined
): string | null {
  if (!value) {
    return null;
  }

  const normalized = String(value)
    .trim()
    .toUpperCase();

  return normalized || null;
}

function escapeRegex(
  value: string
): string {
  return value.replace(
    /[.*+?^${}()|[\]\\]/g,
    '\\$&'
  );
}

// ==========================================
// CHECKBOX HELPER
// ==========================================

function normalizeCheckboxValue(
  value: unknown
): boolean {
  if (value === true) {
    return true;
  }

  if (value === false) {
    return false;
  }

  const normalized = String(
    value || ''
  )
    .trim()
    .toLowerCase();

  return [
    'true',
    '1',
    'yes',
    'on',
    'required',
  ].includes(normalized);
}

// ==========================================
// PARTICIPANT DATA NORMALIZATION
// ==========================================

function normalizeParticipantData(
  participantData: Record<
    string,
    unknown
  >,
  formFields: IFormField[]
): Record<string, unknown> {
  const normalizedData: Record<
    string,
    unknown
  > = {};

  for (const field of formFields) {
    const originalValue =
      participantData[
        field.fieldId
      ];

    if (
      field.fieldType ===
      'checkbox'
    ) {
      normalizedData[
        field.fieldId
      ] =
        normalizeCheckboxValue(
          originalValue
        );

      continue;
    }

    if (
      originalValue ===
        undefined ||
      originalValue === null
    ) {
      normalizedData[
        field.fieldId
      ] = '';

      continue;
    }

    if (
      field.fieldType ===
      'number'
    ) {
      normalizedData[
        field.fieldId
      ] = Number(originalValue);

      continue;
    }

    let stringValue = String(
      originalValue
    ).trim();

    if (
      field.fieldType ===
      'email'
    ) {
      stringValue =
        stringValue.toLowerCase();
    }

    normalizedData[
      field.fieldId
    ] = stringValue;
  }

  /*
   * Preserve any extra participant
   * properties provided by frontend.
   */
  for (const [
    key,
    value,
  ] of Object.entries(
    participantData
  )) {
    if (
      !(key in normalizedData)
    ) {
      normalizedData[key] =
        value;
    }
  }

  return normalizedData;
}

// ==========================================
// DYNAMIC FORM VALIDATION
// ==========================================

function validateDynamicFields(
  participantData: Record<
    string,
    unknown
  >,
  formFields: IFormField[]
): ApiErrorDetail[] {
  const errors: ApiErrorDetail[] =
    [];

  const EMAIL_REGEX =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  for (const field of formFields) {
    const value =
      participantData[
        field.fieldId
      ];

    const stringValue =
      value !== undefined &&
      value !== null
        ? String(value).trim()
        : '';

    // --------------------------------------
    // Required field
    // --------------------------------------

    if (field.isRequired) {
      if (
        field.fieldType ===
        'checkbox'
      ) {
        const checked =
          normalizeCheckboxValue(
            value
          );

        if (!checked) {
          errors.push({
            field:
              field.fieldId,

            message:
              `${field.label} is required`,
          });
        }

        continue;
      }

      if (
        value === undefined ||
        value === null ||
        stringValue === ''
      ) {
        errors.push({
          field:
            field.fieldId,

          message:
            `${field.label} is required`,
        });

        continue;
      }
    }

    // --------------------------------------
    // Optional blank field
    // --------------------------------------

    if (
      !field.isRequired &&
      field.fieldType !==
        'checkbox' &&
      stringValue === ''
    ) {
      continue;
    }

    // --------------------------------------
    // Length protection
    // --------------------------------------

    if (
      stringValue.length >
      1000
    ) {
      errors.push({
        field: field.fieldId,

        message:
          `${field.label} cannot exceed 1000 characters`,
      });

      continue;
    }

    // --------------------------------------
    // Email validation
    // --------------------------------------

    if (
      field.fieldType ===
        'email' &&
      !EMAIL_REGEX.test(
        stringValue
      )
    ) {
      errors.push({
        field: field.fieldId,

        message:
          `${field.label} must be a valid email address`,
      });
    }

    // --------------------------------------
    // Number validation
    // --------------------------------------

    if (
      field.fieldType ===
        'number' &&
      (
        stringValue === '' ||
        Number.isNaN(
          Number(stringValue)
        )
      )
    ) {
      errors.push({
        field: field.fieldId,

        message:
          `${field.label} must be a valid number`,
      });
    }

    // --------------------------------------
    // Dropdown and radio validation
    // --------------------------------------

    if (
      (
        field.fieldType ===
          'dropdown' ||
        field.fieldType ===
          'radio'
      ) &&
      field.options.length >
        0 &&
      !field.options.includes(
        stringValue
      )
    ) {
      errors.push({
        field: field.fieldId,

        message:
          `Invalid choice for ${field.label}`,
      });
    }
  }

  return errors;
}

// ==========================================
// PRICING
// ==========================================

async function calculatePricing(
  baseFee: number,
  promoCode: string | null,
  eventId: string
): Promise<{
  discountAmount: number;
  finalAmount: number;
}> {
  if (!promoCode) {
    return {
      discountAmount: 0,
      finalAmount: baseFee,
    };
  }

  const promoResult =
    await PromoService.validatePromoCode(
      {
        code: promoCode,
        eventId,
      }
    );

  const discountPercent =
    Number(
      promoResult.discountPercent ||
        0
    );

  const discountAmount =
    Math.round(
      (
        baseFee *
        discountPercent
      ) / 100
    );

  const finalAmount =
    Math.max(
      0,
      baseFee -
        discountAmount
    );

  return {
    discountAmount,
    finalAmount,
  };
}

// ==========================================
// CERTIFICATE ID GENERATOR
// ==========================================

async function generateUniqueCertificateId(): Promise<string> {
  /*
   * Try multiple times in the extremely
   * unlikely event of a duplicate ID.
   */
  for (
    let attempt = 0;
    attempt < 10;
    attempt++
  ) {
    const year =
      new Date().getFullYear();

    const randomPart =
      randomBytes(4)
        .toString('hex')
        .toUpperCase();

    const certificateId =
      `LL-${year}-${randomPart}`;

    const alreadyExists =
      await Registration.exists({
        certificateId,
      });

    if (!alreadyExists) {
      return certificateId;
    }
  }

  throw new ApiError(
    500,
    'Unable to generate certificate ID'
  );
}

// ==========================================
// REGISTRATION SERVICE
// ==========================================

export class RegistrationService {
  // ========================================
  // CREATE REGISTRATION — PUBLIC
  // ========================================

  static async createRegistration(
    input: CreateRegistrationInput,
    ipAddress: string
  ): Promise<IRegistration> {
    const event =
      await Event.findById(
        input.eventId
      );

    if (!event) {
      throw new ApiError(
        404,
        'Event not found'
      );
    }

    if (!event.isActive) {
      throw new ApiError(
        400,
        'Registration is closed for this event'
      );
    }

    const participantData =
      normalizeParticipantData(
        input.participantData,
        event.formFields
      );

    const fieldErrors =
      validateDynamicFields(
        participantData,
        event.formFields
      );

    if (
      fieldErrors.length > 0
    ) {
      throw new ApiError(
        400,
        'Form validation failed',
        fieldErrors
      );
    }

    // --------------------------------------
    // Normalize email
    // --------------------------------------

    const normalizedEmail =
      normalizeEmail(
        participantData.email
      );

    if (!normalizedEmail) {
      throw new ApiError(
        400,
        'Email address is required'
      );
    }

    participantData.email =
      normalizedEmail;

    // --------------------------------------
    // Duplicate registration protection
    // --------------------------------------

    const escapedEmail =
      escapeRegex(
        normalizedEmail
      );

    const duplicateRegistration =
      await Registration.findOne({
        eventId: event._id,

        $or: [
          {
            normalizedEmail,
          },
          {
            'participantData.email':
              {
                $regex:
                  new RegExp(
                    `^${escapedEmail}$`,
                    'i'
                  ),
              },
          },
        ],
      });

    if (
      duplicateRegistration
    ) {
      throw new ApiError(
        409,
        'You are already registered for this event'
      );
    }

    // --------------------------------------
    // Promo code
    // --------------------------------------

    const appliedPromoCode =
      normalizePromoCode(
        input.appliedPromoCode
      );

    const pricing =
      await calculatePricing(
        event.baseFee,
        appliedPromoCode,
        String(event._id)
      );

    // --------------------------------------
    // Payment receipt
    // --------------------------------------

    const paymentScreenshotUrl =
      String(
        input.paymentScreenshotUrl ||
          ''
      ).trim();

    /*
     * Receipt is required only when
     * the final amount is above zero.
     */
    if (
      pricing.finalAmount > 0 &&
      !paymentScreenshotUrl
    ) {
      throw new ApiError(
        400,
        'Payment receipt is required'
      );
    }

    // --------------------------------------
    // Create registration
    // --------------------------------------

    try {
      const registration =
        await Registration.create(
          {
            eventId:
              event._id,

            participantData,

            normalizedEmail,

            appliedPromoCode,

            baseAmount:
              event.baseFee,

            discountAmount:
              pricing.discountAmount,

            finalAmount:
              pricing.finalAmount,

            paymentScreenshotUrl,

            paymentStatus:
              'pending',

            adminRemarks: '',

            verifiedBy: null,

            verifiedAt: null,

            certificateId: null,

            certificateIssuedAt:
              null,

            ipAddress:
              String(
                ipAddress || ''
              ).trim(),

            submittedAt:
              new Date(),
          }
        );

      return registration;
    } catch (
      error: unknown
    ) {
      /*
       * MongoDB unique index error.
       */
      if (
        typeof error ===
          'object' &&
        error !== null &&
        'code' in error &&
        error.code === 11000
      ) {
        throw new ApiError(
          409,
          'You are already registered for this event'
        );
      }

      throw error;
    }
  }

  // ========================================
  // GET REGISTRATIONS — ADMIN
  // ========================================

  static async getAllRegistrations(
    query: GetRegistrationsQuery
  ): Promise<PaginatedRegistrations> {
    const page = Math.max(
      1,
      Number(query.page || 1)
    );

    const limit = Math.min(
      100,
      Math.max(
        1,
        Number(
          query.limit || 20
        )
      )
    );

    const filter: Record<
      string,
      unknown
    > = {};

    if (query.status) {
      filter.paymentStatus =
        query.status;
    }

    if (query.eventId) {
      filter.eventId =
        query.eventId;
    }

    const [
      registrations,
      total,
    ] = await Promise.all([
      Registration.find(
        filter
      )
        .sort({
          submittedAt: -1,
        })
        .skip(
          (page - 1) *
            limit
        )
        .limit(limit)
        .populate(
          'eventId',
          'title slug eventDate venue baseFee'
        )
        .populate(
          'verifiedBy',
          'name email'
        )
        .exec(),

      Registration.countDocuments(
        filter
      ),
    ]);

    return {
      data: registrations,
      total,
      page,
      limit,

      totalPages:
        Math.ceil(
          total / limit
        ),
    };
  }

  // ========================================
  // GET SINGLE REGISTRATION — ADMIN
  // ========================================

  static async getRegistrationById(
    id: string
  ): Promise<IRegistration> {
    if (
      !Types.ObjectId.isValid(
        id
      )
    ) {
      throw new ApiError(
        400,
        'Invalid registration ID'
      );
    }

    const registration =
      await Registration.findById(
        id
      )
        .populate(
          'eventId',
          'title slug formFields eventDate venue baseFee'
        )
        .populate(
          'verifiedBy',
          'name email'
        )
        .exec();

    if (!registration) {
      throw new ApiError(
        404,
        'Registration not found'
      );
    }

    return registration;
  }

  // ========================================
  // APPROVE OR REJECT — ADMIN
  // ========================================

  static async updateRegistrationStatus(
    id: string,
    input: UpdateStatusInput,
    adminId: string
  ): Promise<IRegistration> {
    if (
      !Types.ObjectId.isValid(
        id
      )
    ) {
      throw new ApiError(
        400,
        'Invalid registration ID'
      );
    }

    if (
      !Types.ObjectId.isValid(
        adminId
      )
    ) {
      throw new ApiError(
        401,
        'Invalid admin session'
      );
    }

    const registration =
      await Registration.findById(
        id
      );

    if (!registration) {
      throw new ApiError(
        404,
        'Registration not found'
      );
    }

    if (
      registration.paymentStatus !==
      'pending'
    ) {
      throw new ApiError(
        400,
        `Registration has already been ${registration.paymentStatus}`
      );
    }

    if (
      input.status !==
        'verified' &&
      input.status !==
        'rejected'
    ) {
      throw new ApiError(
        400,
        'Status must be verified or rejected'
      );
    }

    const remarks = String(
      input.remarks || ''
    ).trim();

    if (
      input.status ===
        'rejected' &&
      !remarks
    ) {
      throw new ApiError(
        400,
        'Rejection reason is required'
      );
    }

    // --------------------------------------
    // Handle legacy normalizedEmail
    // --------------------------------------

    if (
      !registration.normalizedEmail
    ) {
      const participantEmail =
        normalizeEmail(
          registration
            .participantData
            ?.email
        );

      if (
        participantEmail
      ) {
        const conflict =
          await Registration.findOne(
            {
              _id: {
                $ne:
                  registration._id,
              },

              eventId:
                registration.eventId,

              normalizedEmail:
                participantEmail,
            }
          );

        if (!conflict) {
          registration.normalizedEmail =
            participantEmail;
        }
      }
    }

    // --------------------------------------
    // Generate certificate on approval
    // --------------------------------------

    if (
      input.status ===
        'verified' &&
      !registration.certificateId
    ) {
      registration.certificateId =
        await generateUniqueCertificateId();

      registration.certificateIssuedAt =
        new Date();
    }

    /*
     * Rejected registrations must never
     * receive a certificate.
     */
    if (
      input.status ===
      'rejected'
    ) {
      registration.certificateId =
        null;

      registration.certificateIssuedAt =
        null;
    }

    // --------------------------------------
    // Save status
    // --------------------------------------

    registration.paymentStatus =
      input.status;

    registration.adminRemarks =
      remarks;

    registration.verifiedBy =
      new Types.ObjectId(
        adminId
      );

    registration.verifiedAt =
      new Date();

    await registration.save();

    // --------------------------------------
    // Increment promo usage
    // --------------------------------------

    if (
      input.status ===
        'verified' &&
      registration.appliedPromoCode
    ) {
      await PromoService.incrementUsage(
        registration.appliedPromoCode
      );
    }

    await registration.populate(
      [
        {
          path: 'eventId',

          select:
            'title slug eventDate venue baseFee',
        },
        {
          path: 'verifiedBy',

          select:
            'name email',
        },
      ]
    );

    return registration;
  }

  // ========================================
  // VERIFY CERTIFICATE — PUBLIC
  // ========================================

  static async verifyCertificate(
    certificateId: string
  ) {
    const normalizedCertificateId =
      String(certificateId)
        .trim()
        .toUpperCase();

    const registration =
      await Registration.findOne({
        certificateId:
          normalizedCertificateId,

        paymentStatus:
          'verified',
      })
        .populate(
          'eventId',
          'title slug eventDate venue'
        )
        .select(
          'participantData certificateId certificateIssuedAt verifiedAt eventId paymentStatus'
        )
        .lean();

    if (!registration) {
      throw new ApiError(
        404,
        'Certificate not found or is not valid'
      );
    }

    const participantData =
      registration.participantData as Record<
        string,
        unknown
      >;

    const populatedEvent =
      registration.eventId as unknown as {
        title?: string;
        slug?: string;
        eventDate?: Date;
        venue?: string;
      };

    /*
     * Do not expose email, phone,
     * receipt, IP address, promo code
     * or admin details publicly.
     */
    return {
      certificateId:
        registration.certificateId,

      participantName:
        String(
          participantData.fullName ||
            ''
        ),

      university:
        String(
          participantData.university ||
            ''
        ),

      department:
        String(
          participantData.department ||
            ''
        ),

      track:
        String(
          participantData.trackSelect ||
            ''
        ),

      event: {
        title:
          populatedEvent?.title ||
          '',

        slug:
          populatedEvent?.slug ||
          '',

        eventDate:
          populatedEvent?.eventDate ||
          null,

        venue:
          populatedEvent?.venue ||
          '',
      },

      issuedAt:
        registration.certificateIssuedAt ||
        registration.verifiedAt,

      status: 'verified',
    };
  }
}