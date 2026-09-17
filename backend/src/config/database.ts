import mongoose from 'mongoose';
import { env } from './env.js';

// Disable query buffering in serverless to prevent 10s timeouts
mongoose.set('bufferCommands', false);

interface GlobalMongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongooseCache: GlobalMongooseCache | undefined;
}

const cached: GlobalMongooseCache = globalThis.mongooseCache || { conn: null, promise: null };
if (!globalThis.mongooseCache) {
  globalThis.mongooseCache = cached;
}

export const connectDatabase = async (): Promise<typeof mongoose> => {
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      dbName: 'looplab',
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    };

    cached.promise = mongoose.connect(env.MONGODB_URI, opts).then((m) => {
      console.log(`✅ MongoDB Connected successfully! Host: ${m.connection.host}`);
      return m;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    console.error('❌ MongoDB Connection Error:', error);
    throw error;
  }

  return cached.conn;
};
