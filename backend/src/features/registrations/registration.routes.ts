import { Router } from 'express';

import {
  validate,
} from '../../middlewares/validate.middleware.js';

import {
  authenticate,
} from '../../middlewares/auth.middleware.js';

import {
  createRegistrationSchema,
  updateStatusSchema,
  getRegistrationsQuerySchema,
  registrationIdParamSchema,
  certificateIdParamSchema,
} from './registration.validation.js';

import {
  createRegistration,
  getAllRegistrations,
  getRegistrationById,
  updateRegistrationStatus,
  verifyCertificate,
  getMetrics,
} from './registration.controller.js';

const publicRouter = Router();

const adminRouter = Router();

// ==========================================
// PUBLIC ROUTES
// ==========================================

publicRouter.post(
  '/',
  validate({
    body: createRegistrationSchema,
  }),
  createRegistration
);

publicRouter.get(
  '/certificate/:certificateId',
  validate({
    params:
      certificateIdParamSchema,
  }),
  verifyCertificate
);

// ==========================================
// ADMIN ROUTES
// ==========================================

adminRouter.use(authenticate);

adminRouter.get(
  '/metrics',
  getMetrics
);

adminRouter.get(
  '/',
  validate({
    query:
      getRegistrationsQuerySchema,
  }),
  getAllRegistrations
);

adminRouter.get(
  '/:id',
  validate({
    params:
      registrationIdParamSchema,
  }),
  getRegistrationById
);

adminRouter.patch(
  '/:id/status',
  validate({
    params:
      registrationIdParamSchema,

    body:
      updateStatusSchema,
  }),
  updateRegistrationStatus
);

export {
  publicRouter as registrationPublicRouter,
  adminRouter as registrationAdminRouter,
};