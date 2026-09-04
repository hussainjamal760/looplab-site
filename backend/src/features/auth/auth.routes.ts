import { Router } from 'express';
import { validate } from '../../middlewares/validate.middleware.js';
import { authenticate } from '../../middlewares/auth.middleware.js';
import { loginSchema, createAdminSchema } from './auth.validation.js';
import { login, logout, getMe, createAdmin } from './auth.controller.js';

const router = Router();

// Public routes
router.post('/login', validate({ body: loginSchema }), login);

// Protected routes — requires valid JWT
router.post('/logout', authenticate, logout);
router.get('/me', authenticate, getMe);
router.post('/create-admin', authenticate, validate({ body: createAdminSchema }), createAdmin);

export default router;
