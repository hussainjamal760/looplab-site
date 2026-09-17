/**
 * One-time cleanup script: deletes ALL registration documents
 * (both 'pending' and 'verified') from the looplab database.
 *
 * Usage:
 *   npx ts-node --esm src/cleanup_registrations.ts
 *
 * Run from: looplab/backend/
 */

import mongoose from 'mongoose';
import { env } from './config/env.js';
import { Registration } from './features/registrations/registration.model.js';

const cleanup = async (): Promise<void> => {
  console.log('🔌 Connecting to MongoDB…');

  await mongoose.connect(env.MONGODB_URI, {
    dbName: 'looplab',
  });

  console.log('✅ Connected.');

  /* Count before deletion for a clear summary */
  const [pendingCount, verifiedCount, rejectedCount] =
    await Promise.all([
      Registration.countDocuments({ paymentStatus: 'pending' }),
      Registration.countDocuments({ paymentStatus: 'verified' }),
      Registration.countDocuments({ paymentStatus: 'rejected' }),
    ]);

  console.log('\n📊 Current counts:');
  console.log(`   Pending  : ${pendingCount}`);
  console.log(`   Verified : ${verifiedCount}`);
  console.log(`   Rejected : ${rejectedCount}`);
  console.log(`   TOTAL    : ${pendingCount + verifiedCount + rejectedCount}`);

  console.log('\n🗑️  Deleting ALL registrations…');
  const result = await Registration.deleteMany({});

  console.log(`✅ Deleted ${result.deletedCount} registration(s).`);

  await mongoose.disconnect();
  console.log('🔌 Disconnected. Done!\n');
};

cleanup().catch((err) => {
  console.error('❌ Cleanup failed:', err);
  process.exit(1);
});
