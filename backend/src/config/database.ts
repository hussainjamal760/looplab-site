import mongoose from 'mongoose';
import { env } from './env.js';

export const connectDatabase = async (): Promise<void> => {
  try {
    const connectionInstance = await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 15000,
      connectTimeoutMS: 15000,
    });
    console.log(`✅ MongoDB Connected successfully! Host: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB Connection Failure:', error);
    if (env.NODE_ENV === 'development') {
      console.warn('⚠️ Attempting fallback reconnect in 3 seconds...');
      setTimeout(() => {
        mongoose.connect(env.MONGODB_URI, {
          serverSelectionTimeoutMS: 15000,
          connectTimeoutMS: 15000,
        }).catch((err) => console.error('❌ Reconnect failed:', err));
      }, 3000);
      return;
    }
    process.exit(1);
  }
};

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ MongoDB disconnected. Attempting to reconnect...');
  mongoose.connect(env.MONGODB_URI, {
    serverSelectionTimeoutMS: 15000,
    connectTimeoutMS: 15000,
  }).catch((err) => console.error('❌ Reconnect error:', err));
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB Connection Error:', err);
});
