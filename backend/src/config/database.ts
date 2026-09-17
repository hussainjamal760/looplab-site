import mongoose from 'mongoose';
import { env } from './env.js';

let isConnectingPromise: Promise<typeof mongoose> | null = null;

export const connectDatabase = async (): Promise<void> => {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  if (isConnectingPromise) {
    await isConnectingPromise;
    return;
  }

  try {
    isConnectingPromise = mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 15000,
      connectTimeoutMS: 15000,
      bufferCommands: false, // Prevents queries from hanging indefinitely if connection fails
    });
    const connectionInstance = await isConnectingPromise;
    console.log(`✅ MongoDB Connected successfully! Host: ${connectionInstance.connection.host}`);
  } catch (error) {
    isConnectingPromise = null;
    console.error('❌ MongoDB Connection Failure:', error);
    if (env.NODE_ENV === 'development') {
      return;
    }
    throw error;
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
