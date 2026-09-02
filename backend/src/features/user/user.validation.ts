import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address format'),
  role: z.enum(['admin', 'user']).optional().default('user'),
});

export const userIdParamSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid MongoDB ObjectId'),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
