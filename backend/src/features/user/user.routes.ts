import { Router } from 'express';
import { createUser, getUsers, getUserById } from './user.controller.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { createUserSchema, userIdParamSchema } from './user.validation.js';

const router = Router();

router.post('/', validate({ body: createUserSchema }), createUser);
router.get('/', getUsers);
router.get('/:id', validate({ params: userIdParamSchema }), getUserById);

export default router;
