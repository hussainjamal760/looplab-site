import { z } from 'zod';

import {
  env,
} from '../../config/env.js';

/*
 * Only URLs from your configured
 * Cloudinary account are accepted.
 */
const CLOUDINARY_URL_PREFIX =
  `https://res.cloudinary.com/${env.CLOUDINARY_CLOUD_NAME}/`;

// ==========================================
// CREATE REGISTRATION
// ==========================================

export const createRegistrationSchema =
  z.object({
    eventId: z
      .string()
      .regex(
        /^[0-9a-fA-F]{24}$/,
        'Invalid event ID'
      ),

    participantData: z
      .record(
        z.string(),
        z.unknown()
      )
      .refine(
        (data) =>
          Object.keys(data).length >
          0,

        'Participant data cannot be empty'
      ),

    /*
     * Promo code is automatically
     * converted to capital letters.
     */
    appliedPromoCode: z
      .union([
        z.literal(''),

        z
          .string()
          .min(
            3,
            'Promo code must contain at least 3 characters'
          )
          .max(
            50,
            'Promo code cannot exceed 50 characters'
          )
          .regex(
            /^[A-Za-z0-9_-]+$/,
            'Promo code contains invalid characters'
          ),
      ])
      .transform((value) => {
        const normalized = String(
          value || ''
        )
          .trim()
          .toUpperCase();

        return normalized || null;
      })
      .nullable()
      .optional()
      .default(null),

    /*
     * Empty receipt is allowed for a free
     * event. If a URL is provided, it must
     * belong to the configured Cloudinary
     * account.
     */
    paymentScreenshotUrl: z
      .union([
        z.literal(''),

        z
          .string()
          .url(
            'Payment receipt must be a valid URL'
          )
          .startsWith(
            CLOUDINARY_URL_PREFIX,

            'Payment receipt must belong to the official LoopLab Cloudinary account'
          ),
      ])
      .default(''),
  });

// ==========================================
// UPDATE REGISTRATION STATUS
// ==========================================

export const updateStatusSchema =
  z
    .object({
      status: z.enum([
        'verified',
        'rejected',
      ]),

      remarks: z
        .string()
        .trim()
        .max(
          500,
          'Remarks cannot exceed 500 characters'
        )
        .optional()
        .default(''),
    })
    .superRefine(
      (data, context) => {
        if (
          data.status ===
            'rejected' &&
          !data.remarks.trim()
        ) {
          context.addIssue({
            code:
              z.ZodIssueCode.custom,

            path: ['remarks'],

            message:
              'Rejection reason is required',
          });
        }
      }
    );

// ==========================================
// GET REGISTRATIONS QUERY
// ==========================================

export const getRegistrationsQuerySchema =
  z.object({
    status: z
      .enum([
        'pending',
        'verified',
        'rejected',
      ])
      .optional(),

    eventId: z
      .string()
      .regex(
        /^[0-9a-fA-F]{24}$/,
        'Invalid event ID'
      )
      .optional(),

    page: z.coerce
      .number()
      .int()
      .positive(
        'Page must be a positive number'
      )
      .default(1),

    limit: z.coerce
      .number()
      .int()
      .min(
        1,
        'Limit must be at least 1'
      )
      .max(
        100,
        'Limit cannot exceed 100'
      )
      .default(20),
  });

// ==========================================
// REGISTRATION ID PARAMETER
// ==========================================

export const registrationIdParamSchema =
  z.object({
    id: z
      .string()
      .regex(
        /^[0-9a-fA-F]{24}$/,
        'Invalid registration ID'
      ),
  });

// ==========================================
// CERTIFICATE ID PARAMETER
// ==========================================

export const certificateIdParamSchema =
  z.object({
    certificateId: z
      .string()
      .trim()
      .toUpperCase()
      .min(
        8,
        'Invalid certificate ID'
      )
      .max(
        50,
        'Invalid certificate ID'
      )
      .regex(
        /^[A-Z0-9-]+$/,
        'Invalid certificate ID format'
      ),
  });

// ==========================================
// TYPES
// ==========================================

export type CreateRegistrationInput =
  z.infer<
    typeof createRegistrationSchema
  >;

export type UpdateStatusInput =
  z.infer<
    typeof updateStatusSchema
  >;

export type GetRegistrationsQuery =
  z.infer<
    typeof getRegistrationsQuerySchema
  >;