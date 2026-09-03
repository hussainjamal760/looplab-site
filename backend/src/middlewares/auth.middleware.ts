import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';
import { Admin, IAdmin } from '../features/auth/auth.model.js';

declare global {
  namespace Express {
    interface Request {
      admin?: IAdmin;
    }
  }
}

interface JwtPayload {
  adminId: string;
  role: string;
}

const extractToken = (req: Request): string | null => {
  // Try httpOnly cookie first
  const cookieToken = req.cookies?.accessToken as string | undefined;
  if (cookieToken) return cookieToken;
  // Fallback to Authorization header for flexibility
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith('Bearer ')) return authHeader.split(' ')[1];
  return null;
};

export const authenticate = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  const token = extractToken(req);
  if (!token) return next(new ApiError(401, 'Authentication required'));

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    const admin = await Admin.findById(decoded.adminId).select('-password').lean();
    if (!admin || !admin.isActive) {
      return next(new ApiError(401, 'Account not found or deactivated'));
    }
    req.admin = admin as IAdmin;
    next();
  } catch {
    next(new ApiError(401, 'Invalid or expired session. Please log in again'));
  }
};

export const authorize = (...roles: string[]) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.admin || !roles.includes(req.admin.role)) {
      return next(new ApiError(403, 'Forbidden: insufficient permissions'));
    }
    next();
  };
