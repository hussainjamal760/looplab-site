import { Router } from 'express';
import { uploadReceiptMiddleware } from './upload.middleware.js';
import { uploadReceipt } from './upload.controller.js';

const router = Router();

// Public — no auth required. Security is enforced via file type/size guards in middleware.
router.post('/receipt', uploadReceiptMiddleware, uploadReceipt);

export default router;
