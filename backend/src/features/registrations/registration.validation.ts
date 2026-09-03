import { z } from 'zod';

const CLOUDINARY_URL_PREFIX = 'https://res.cloudinary.com/';

export const createRegistrationSchema = z.object({
  eventId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid event ID'),
  participantData: z
    .record(z.string(), z.unknown())
    .refine((data) => Object.keys(data).length > 0, 'Participant data cannot be empty'),
  appliedPromoCode: z.string().toUpperCase().trim().nullable().optional().default(null),
  paymentScreenshotUrl: z
    .string()
    .url('Must be a valid URL')
    .startsWith(CLOUDINARY_URL_PREFIX, 'Payment screenshot must be a valid Cloudinary URL'),
});

export const updateStatusSchema = z.object({
  status: z.enum(['verified', 'rejected']),
  remarks: z.string().max(500).optional().default(''),
});

export const getRegistrationsQuerySchema = z.object({
  status: z.enum(['pending', 'verified', 'rejected']).optional(),
  eventId: z.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const registrationIdParamSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid registration ID'),
});

export type CreateRegistrationInput = z.infer<typeof createRegistrationSchema>;
export type UpdateStatusInput = z.infer<typeof updateStatusSchema>;
export type GetRegistrationsQuery = z.infer<typeof getRegistrationsQuerySchema>;
