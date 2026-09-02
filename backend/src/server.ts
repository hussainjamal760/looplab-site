import app from './app.js';
import { env } from './config/env.js';
import { connectDatabase } from './config/database.js';

const startServer = async () => {
  try {
    // 1. Connect to Database
    await connectDatabase();

    // 2. Start HTTP Server
    const server = app.listen(env.PORT, () => {
      console.log(
        `🚀 Looplab Backend Server running in [${env.NODE_ENV}] mode on port http://localhost:${env.PORT}`
      );
    });

    // 3. Graceful Shutdown Signal Handler
    const handleShutdown = (signal: string) => {
      console.log(`\n⚠️ Received ${signal}. Shutting down gracefully...`);
      server.close(() => {
        console.log('🔒 HTTP Server closed.');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => handleShutdown('SIGTERM'));
    process.on('SIGINT', () => handleShutdown('SIGINT'));
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
