import { Registration, IRegistration } from './registration.model.js';
import { Event, IFormField } from '../events/event.model.js';
import { PromoService } from '../promo/promo.service.js';
import { CreateRegistrationInput, GetRegistrationsQuery, UpdateStatusInput } from './registration.validation.js';
import { ApiError, ApiErrorDetail } from '../../utils/ApiError.js';

interface PaginatedRegistrations {
  data: IRegistration[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const validateDynamicFields = (
  participantData: Record<string, unknown>,
  formFields: IFormField[]
): ApiErrorDetail[] => {
  const errors: ApiErrorDetail[] = [];
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  for (const field of formFields) {
    const value = participantData[field.fieldId];
    const strVal = value !== undefined && value !== null ? String(value).trim() : '';

    // 1. Required field validation
    if (field.isRequired && (value === undefined || value === null || strVal === '')) {
      errors.push({ field: field.fieldId, message: `${field.label} is required` });
      continue;
    }

    // Skip type validation if optional and blank
    if (!field.isRequired && strVal === '') continue;

    // 2. Length guard (supports emojis cleanly up to 1,000 characters per field)
    if (strVal.length > 1000) {
      errors.push({ field: field.fieldId, message: `${field.label} cannot exceed 1000 characters` });
      continue;
    }

    // 3. Email format validation
    if (field.fieldType === 'email' && !EMAIL_REGEX.test(strVal)) {
      errors.push({ field: field.fieldId, message: `${field.label} must be a valid email address` });
    }

    // 4. Number validation
    if (field.fieldType === 'number' && isNaN(Number(strVal))) {
      errors.push({ field: field.fieldId, message: `${field.label} must be a valid number` });
    }

    // 5. Dropdown / Radio choice restriction
    if ((field.fieldType === 'dropdown' || field.fieldType === 'radio') && field.options.length > 0) {
      if (!field.options.includes(strVal)) {
        errors.push({ field: field.fieldId, message: `Invalid choice for ${field.label}` });
      }
    }
  }
  return errors;
};

const calculatePricing = async (
  baseFee: number,
  promoCode: string | null | undefined,
  eventId: string
): Promise<{ discountAmount: number; finalAmount: number }> => {
  if (!promoCode) return { discountAmount: 0, finalAmount: baseFee };
  const { discountPercent } = await PromoService.validatePromoCode({ code: promoCode, eventId });
  const discountAmount = Math.round(baseFee * discountPercent / 100);
  return { discountAmount, finalAmount: baseFee - discountAmount };
};

export class RegistrationService {
  /** Submit a new hackathon registration (public) */
  static async createRegistration(
    input: CreateRegistrationInput,
    ipAddress: string
  ): Promise<IRegistration> {
    const event = await Event.findById(input.eventId).lean();
    if (!event) throw new ApiError(404, 'Event not found');
    if (!event.isActive) throw new ApiError(400, 'Registration is closed for this event');

    const fieldErrors = validateDynamicFields(input.participantData, event.formFields);
    if (fieldErrors.length > 0) throw new ApiError(400, 'Form validation failed', fieldErrors);

    const pricing = await calculatePricing(event.baseFee, input.appliedPromoCode, input.eventId);

    return Registration.create({
      eventId: input.eventId,
      participantData: input.participantData,
      appliedPromoCode: input.appliedPromoCode ?? null,
      baseAmount: event.baseFee,
      discountAmount: pricing.discountAmount,
      finalAmount: pricing.finalAmount,
      paymentScreenshotUrl: input.paymentScreenshotUrl,
      paymentStatus: 'pending',
      ipAddress,
    });
  }

  /** Get paginated list of registrations with optional filters (admin) */
  static async getAllRegistrations(query: GetRegistrationsQuery): Promise<PaginatedRegistrations> {
    const { page, limit, status, eventId } = query;
    const filter: Record<string, unknown> = {};
    if (status) filter.paymentStatus = status;
    if (eventId) filter.eventId = eventId;

    const [data, total] = await Promise.all([
      Registration.find(filter)
        .sort({ submittedAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate('eventId', 'title slug')
        .lean(),
      Registration.countDocuments(filter),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  /** Get a single registration by ID (admin — for side-by-side modal view) */
  static async getRegistrationById(id: string): Promise<IRegistration> {
    const reg = await Registration.findById(id)
      .populate('eventId', 'title slug formFields')
      .populate('verifiedBy', 'name email')
      .lean();
    if (!reg) throw new ApiError(404, 'Registration not found');
    return reg;
  }

  /** Verify or reject a payment submission (admin) */
  static async updateRegistrationStatus(
    id: string,
    input: UpdateStatusInput,
    adminId: string
  ): Promise<IRegistration> {
    const reg = await Registration.findById(id);
    if (!reg) throw new ApiError(404, 'Registration not found');
    if (reg.paymentStatus !== 'pending') {
      throw new ApiError(400, `Registration has already been ${reg.paymentStatus}`);
    }

    reg.paymentStatus = input.status;
    reg.adminRemarks = input.remarks ?? '';
    reg.verifiedBy = adminId as unknown as IRegistration['verifiedBy'];
    reg.verifiedAt = new Date();
    await reg.save();

    // Increment promo usage ONLY on approval
    if (input.status === 'verified' && reg.appliedPromoCode) {
      await PromoService.incrementUsage(reg.appliedPromoCode);
    }

    return reg;
  }
}
