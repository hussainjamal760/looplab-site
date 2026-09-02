import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { ApiResponse } from '../../utils/ApiResponse.js';

export const checkHealth = asyncHandler(async (_req: Request, res: Response) => {
  const healthData = {
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    status: 'OK',
  };

  return res
    .status(200)
    .json(new ApiResponse(200, healthData, 'Server health check passed'));
});
