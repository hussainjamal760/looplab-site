import { Request, Response } from 'express';
import { uploadReceiptToCloudinary } from './upload.service.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { ApiError } from '../../utils/ApiError.js';

export const uploadReceipt = asyncHandler(async (req: Request, res: Response) => {
  if (!req.file) {
    throw new ApiError(400, 'No receipt file provided. Please attach a file with field name "receipt"');
  }
  const url = await uploadReceiptToCloudinary(req.file.buffer, req.file.mimetype);
  res.status(200).json(new ApiResponse(200, { url }, 'Receipt uploaded successfully'));
});
