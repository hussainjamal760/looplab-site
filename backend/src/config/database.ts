import mongoose from 'mongoose';
import { env } from './env.js';

export const connectDatabase = async (): Promise<void> => {
  try {
    const connectionInstance = await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 4000,
    });
    console.log(` MongoDB Connected successfully! Host: ${connectionInstance.connection.host}`);
  } catch (error) {
    if (env.NODE_ENV === 'development') {
      console.warn('⚠️ MongoDB Atlas Connection Unreachable (IP whitelist or paused cluster).');
      console.warn('⚠️ Server continuing in Development mode with fallback credentials.');
      return;
    }
    console.error(' MongoDB Connection Failure:', error);
    process.exit(1);
  }
};

mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB disconnected.');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB Connection Error:', err);
});
