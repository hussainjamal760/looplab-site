import { Router } from 'express';
import { validate } from '../../middlewares/validate.middleware.js';
import { authenticate } from '../../middlewares/auth.middleware.js';
import {
  createEventSchema,
  updateEventSchema,
  toggleBannerSchema,
  eventIdParamSchema,
  eventSlugParamSchema,
} from './event.validation.js';
import {
  getActiveEvent,
  getEventBySlug,
  getAllEvents,
  createEvent,
  updateEvent,
  toggleBanner,
  deleteEvent,
} from './event.controller.js';

const publicRouter = Router();
const adminRouter = Router();

// -- Public Routes --
publicRouter.get('/active', getActiveEvent);
publicRouter.get('/:slug', validate({ params: eventSlugParamSchema }), getEventBySlug);

// -- Admin Routes (all protected by authenticate) --
adminRouter.use(authenticate);
adminRouter.get('/', getAllEvents);
adminRouter.post('/', validate({ body: createEventSchema }), createEvent);
adminRouter.patch('/:id', validate({ params: eventIdParamSchema, body: updateEventSchema }), updateEvent);
adminRouter.patch('/:id/banner', validate({ params: eventIdParamSchema, body: toggleBannerSchema }), toggleBanner);
adminRouter.delete('/:id', validate({ params: eventIdParamSchema }), deleteEvent);

export { publicRouter as eventPublicRouter, adminRouter as eventAdminRouter };
