import { z } from 'zod';

export const validatePromoSchema = z.object({
  code: z.string().min(1).max(50).toUpperCase().trim(),
  eventId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid event ID'),
});

export const createPromoSchema = z.object({
  code: z
    .string()
    .min(3, 'Code must be at least 3 characters')
    .max(30)
    .toUpperCase()
    .trim()
    .regex(/^[A-Z0-9_-]+$/, 'Code can only contain letters, numbers, hyphens, underscores'),
  partnerName: z.string().min(2).max(100).trim(),
  partnerType: z.enum(['ambassador', 'community_partner']),
  discountPercent: z.number().min(1).max(100).default(10),
  maxUsage: z.number().int().positive().nullable().default(null),
  isActive: z.boolean().default(true),
  eventId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, 'Invalid event ID')
    .nullable()
    .optional()
    .default(null),
});

export const promoIdParamSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid promo code ID'),
});

export type ValidatePromoInput = z.infer<typeof validatePromoSchema>;
export type CreatePromoInput = z.infer<typeof createPromoSchema>;
