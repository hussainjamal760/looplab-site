import { z } from 'zod';

const formFieldSchema = z.object({
  fieldId: z
    .string()
    .min(1)
    .regex(/^[a-zA-Z][a-zA-Z0-9_]*$/, 'fieldId must start with a letter and contain only alphanumeric/underscore'),
  label: z.string().min(1).max(200),
  fieldType: z.enum(['text', 'number', 'email', 'dropdown', 'radio', 'textarea', 'checkbox']),
  options: z.array(z.string().min(1)).optional().default([]),
  isRequired: z.boolean().default(true),
  placeholder: z.string().max(200).optional().default(''),
  order: z.number().int().min(0).default(0),
});

export const createEventSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(200).trim(),
  slug: z
    .string()
    .min(2)
    .max(100)
    .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens')
    .optional(),
  description: z.string().max(2000).optional().default(''),
  category: z.enum(['Hackathon', 'Workshop', 'Summit']).default('Hackathon'),
  eventDate: z.string().datetime({ offset: true }).optional().nullable(),
  venue: z.string().max(300).optional().default(''),
  baseFee: z.number().min(0, 'Fee cannot be negative').default(0),
  isActive: z.boolean().default(false),
  formFields: z.array(formFieldSchema).default([]),
});

export const updateEventSchema = createEventSchema.partial();

export const toggleBannerSchema = z.object({
  isLiveBanner: z.boolean(),
});

export const eventSlugParamSchema = z.object({
  slug: z.string().min(1),
});

export const eventIdParamSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid event ID'),
});

export type CreateEventInput = z.infer<typeof createEventSchema>;
export type UpdateEventInput = z.infer<typeof updateEventSchema>;
