import mongoose from 'mongoose';
import { env } from './env.js';

export const connectDatabase = async (): Promise<void> => {
  try {
    const connectionInstance = await mongoose.connect(env.MONGODB_URI);
    console.log(`✅ MongoDB Connected successfully! Host: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB Connection Failure:', error);
    process.exit(1);
  }
};

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ MongoDB disconnected.');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB Connection Error:', err);
});
