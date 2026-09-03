import { Router } from 'express';
import { validate } from '../../middlewares/validate.middleware.js';
import { authenticate } from '../../middlewares/auth.middleware.js';
import {
  createRegistrationSchema,
  updateStatusSchema,
  getRegistrationsQuerySchema,
  registrationIdParamSchema,
} from './registration.validation.js';
import {
  createRegistration,
  getAllRegistrations,
  getRegistrationById,
  updateRegistrationStatus,
  getMetrics,
} from './registration.controller.js';

const publicRouter = Router();
const adminRouter = Router();

// ── Public Routes─────────
publicRouter.post('/', validate({ body: createRegistrationSchema }), createRegistration);

// ── Admin Routes──────────
adminRouter.use(authenticate);
adminRouter.get('/metrics', getMetrics);
adminRouter.get('/', validate({ query: getRegistrationsQuerySchema }), getAllRegistrations);
adminRouter.get('/:id', validate({ params: registrationIdParamSchema }), getRegistrationById);
adminRouter.patch(
  '/:id/status',
  validate({ params: registrationIdParamSchema, body: updateStatusSchema }),
  updateRegistrationStatus
);

export { publicRouter as registrationPublicRouter, adminRouter as registrationAdminRouter };
