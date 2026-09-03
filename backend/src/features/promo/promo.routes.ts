import { Router } from 'express';
import { validate } from '../../middlewares/validate.middleware.js';
import { authenticate } from '../../middlewares/auth.middleware.js';
import {
  validatePromoSchema,
  createPromoSchema,
  promoIdParamSchema,
} from './promo.validation.js';
import {
  validatePromoCode,
  getAllPromoCodes,
  createPromoCode,
  togglePromoActive,
} from './promo.controller.js';
import { z } from 'zod';

const publicRouter = Router();
const adminRouter = Router();

const toggleActiveSchema = z.object({ isActive: z.boolean() });

// -- Public Routes ------------------------------------------------------
publicRouter.post('/validate', validate({ body: validatePromoSchema }), validatePromoCode);

// -- Admin Routes -------------------------------------------------------
adminRouter.use(authenticate);
adminRouter.get('/', getAllPromoCodes);
adminRouter.post('/', validate({ body: createPromoSchema }), createPromoCode);
adminRouter.patch(
  '/:id',
  validate({ params: promoIdParamSchema, body: toggleActiveSchema }),
  togglePromoActive
);

export { publicRouter as promoPublicRouter, adminRouter as promoAdminRouter };
