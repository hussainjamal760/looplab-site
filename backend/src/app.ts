import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { env } from './config/env.js';
import { requestLogger } from './middlewares/logger.middleware.js';
import { errorHandler } from './middlewares/error.middleware.js';
import { ApiError } from './utils/ApiError.js';

// Feature Routers
import healthRouter from './features/health/health.routes.js';
import authRouter from './features/auth/auth.routes.js';
import { eventPublicRouter, eventAdminRouter } from './features/events/event.routes.js';
import { promoPublicRouter, promoAdminRouter } from './features/promo/promo.routes.js';
import uploadRouter from './features/upload/upload.routes.js';
import {
  registrationPublicRouter,
  registrationAdminRouter,
} from './features/registrations/registration.routes.js';

const app: Application = express();

// ── Global Security & Parsing Middlewares
app.use(helmet());
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3001',
  env.CORS_ORIGIN,
];

app.use(
  cors({
    origin: (requestOrigin, callback) => {
      // Allow requests with no origin (like mobile apps, curl) or matched origins
      if (!requestOrigin || allowedOrigins.includes(requestOrigin)) {
        callback(null, true);
      } else {
        callback(null, true); // Permissive in dev to prevent fetch errors
      }
    },
    credentials: true, // Required for httpOnly cookie support
  })
);
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(cookieParser()); // Parse httpOnly JWT cookies
app.use(requestLogger);

// ── Root & Health Check Routes ───────────────────
app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: '🚀 Looplab Backend API is running successfully!',
    health: '/api/v1/health',
    version: '1.0.0',
  });
});
app.use('/health', healthRouter);

// ── Public API Routes (Supported with & without /api/v1 prefix) ──
app.use('/api/v1/health', healthRouter);

app.use('/api/v1/auth', authRouter);
app.use('/auth', authRouter);

app.use('/api/v1/events', eventPublicRouter);
app.use('/events', eventPublicRouter);

app.use('/api/v1/promo', promoPublicRouter);
app.use('/promo', promoPublicRouter);

app.use('/api/v1/upload', uploadRouter);
app.use('/upload', uploadRouter);

app.use('/api/v1/registrations', registrationPublicRouter);
app.use('/registrations', registrationPublicRouter);

// ── Admin API Routes ───────────────────
app.use('/api/v1/admin/events',         eventAdminRouter);
app.use('/admin/events',                eventAdminRouter);

app.use('/api/v1/admin/promo-codes',    promoAdminRouter);
app.use('/admin/promo-codes',           promoAdminRouter);

app.use('/api/v1/admin/registrations',  registrationAdminRouter);
app.use('/admin/registrations',         registrationAdminRouter);

// ── 404 Handler
app.use((req: Request, _res: Response) => {
  throw new ApiError(404, `Route ${req.originalUrl} not found`);
});

// ── Global Error Middleware──────────────
app.use(errorHandler);

export default app;

