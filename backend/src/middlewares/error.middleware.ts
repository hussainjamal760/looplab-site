import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError.js';
import { env } from '../config/env.js';

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  let error: ApiError;

  if (err instanceof ApiError) {
    error = err;
  } else if (err instanceof Error) {
    const statusCode = (err as NodeJS.ErrnoException & { statusCode?: number; status?: number }).statusCode
      ?? (err as NodeJS.ErrnoException & { status?: number }).status
      ?? 500;
    error = new ApiError(statusCode, err.message, [], err.stack ?? '');
  } else {
    error = new ApiError(500, 'Internal Server Error');
  }

  const response = {
    statusCode: error.statusCode,
    message: error.message,
    errors: error.errors,
    success: false,
    ...(env.NODE_ENV === 'development' && { stack: error.stack }),
  };

  res.status(error.statusCode).json(response);
};

