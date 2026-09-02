import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env.js';
import { requestLogger } from './middlewares/logger.middleware.js';
import { errorHandler } from './middlewares/error.middleware.js';
import { ApiError } from './utils/ApiError.js';

// Feature Routes
import healthRouter from './features/health/health.routes.js';
import userRouter from './features/user/user.routes.js';

const app: Application = express();

// Global Middlewares
app.use(helmet());
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(requestLogger);

// API v1 Routes
app.use('/api/v1/health', healthRouter);
app.use('/api/v1/users', userRouter);

// 404 Route Handler
app.use('*', (req: Request, _res: Response) => {
  throw new ApiError(404, `Route ${req.originalUrl} not found`);
});

// Global Error Middleware
app.use(errorHandler);

export default app;
