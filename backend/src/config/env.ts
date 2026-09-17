import dotenv from 'dotenv';
import path from 'path';
import { z } from 'zod';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const envSchema = z.object({
  PORT: z.string().default('5000').transform((val) => parseInt(val, 10)),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  MONGODB_URI: z.string().min(1, { message: 'MONGODB_URI is required' }),
  CORS_ORIGIN: z.string().default('*'),

  // JWT Auth
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters long'),
  JWT_EXPIRES_IN: z.string().default('7d'),
  COOKIE_SAME_SITE: z.enum(['none', 'lax', 'strict']).default('none'),
  COOKIE_DOMAIN: z.string().optional(),

  // Cloudinary
  CLOUDINARY_CLOUD_NAME: z.string().min(1, 'CLOUDINARY_CLOUD_NAME is required'),
  CLOUDINARY_API_KEY: z.string().min(1, 'CLOUDINARY_API_KEY is required'),
  CLOUDINARY_API_SECRET: z.string().min(1, 'CLOUDINARY_API_SECRET is required'),

  // Seed Admin / Dev Fallback
  SEED_ADMIN_NAME: z.string().default('LoopLab Admin'),
  SEED_ADMIN_EMAIL: z.string().default('admin@looplab.site'),
  SEED_ADMIN_PASSWORD: z.string().default('nabsite!@'),
});

const parseEnv = () => {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.error('❌ Invalid environment variables parsed by Zod:');
    console.error(JSON.stringify(result.error.format(), null, 2));
    process.exit(1);
  }

  return result.data;
};

export const env = parseEnv();
