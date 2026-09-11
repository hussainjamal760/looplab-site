import {
  Router,
} from 'express';

import {
  uploadReceiptMiddleware,
} from './upload.middleware.js';

import {
  uploadReceipt,
} from './upload.controller.js';

const router = Router();

/*
 * Public upload endpoint.
 *
 * Security is handled through:
 * - One file maximum
 * - Maximum 5 MB
 * - Allowed MIME types
 * - Actual file signature validation
 */
router.post(
  '/receipt',
  uploadReceiptMiddleware,
  uploadReceipt
);

export default router;