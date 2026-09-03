/**
 * Admin Seed Script
 * Run once to create the initial superadmin account.
 * Usage: npx ts-node src/features/auth/seed.admin.ts
 */
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

import mongoose from 'mongoose';
import { Admin } from './auth.model.js';

const SEED_NAME     = process.env.SEED_ADMIN_NAME     ?? 'LoopLab Admin';
const SEED_EMAIL    = process.env.SEED_ADMIN_EMAIL    ?? 'admin@looplab.org';
const SEED_PASSWORD = process.env.SEED_ADMIN_PASSWORD ?? '';
const MONGO_URI     = process.env.MONGODB_URI         ?? '';

const run = async (): Promise<void> => {
  if (!MONGO_URI) {
    console.error('ERROR: MONGODB_URI is not set in .env');
    process.exit(1);
  }
  if (SEED_PASSWORD.length < 8) {
    console.error('ERROR: SEED_ADMIN_PASSWORD must be at least 8 characters');
    process.exit(1);
  }

  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');

  const existing = await Admin.findOne({ email: SEED_EMAIL });
  if (existing) {
    console.log('Admin with email ' + SEED_EMAIL + ' already exists. Skipping.');
    await mongoose.disconnect();
    return;
  }

  await Admin.create({ name: SEED_NAME, email: SEED_EMAIL, password: SEED_PASSWORD, role: 'superadmin' });
  console.log('Superadmin created: ' + SEED_EMAIL);
  await mongoose.disconnect();
};

run().catch((err: unknown) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
