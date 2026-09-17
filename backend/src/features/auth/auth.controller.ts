import { Request, Response, CookieOptions } from 'express';
import { AuthService } from './auth.service.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { env } from '../../config/env.js';

const COOKIE_NAME = 'accessToken';

const getCookieOptions = (): CookieOptions => {
  const isProd = env.NODE_ENV === 'production';
  return {
    httpOnly: true,
    secure: isProd || env.COOKIE_SAME_SITE === 'none',
    sameSite: isProd ? (env.COOKIE_SAME_SITE || 'none') : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
    ...(env.COOKIE_DOMAIN ? { domain: env.COOKIE_DOMAIN } : {}),
  };
};

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { admin, token } = await AuthService.login(req.body);
  const options = getCookieOptions();
  res
    .status(200)
    .cookie(COOKIE_NAME, token, options)
    .json(new ApiResponse(200, { admin, token }, 'Login successful'));
});

export const logout = asyncHandler(async (_req: Request, res: Response) => {
  res
    .status(200)
    .clearCookie(COOKIE_NAME, getCookieOptions())
    .json(new ApiResponse(200, null, 'Logged out successfully'));
});

export const getMe = asyncHandler(async (req: Request, res: Response) => {
  const admin = await AuthService.getAdminById(String(req.admin?._id));
  res.status(200).json(new ApiResponse(200, { admin }, 'Profile fetched successfully'));
});

export const createAdmin = asyncHandler(async (req: Request, res: Response) => {
  const admin = await AuthService.createAdmin(req.body);
  res.status(201).json(new ApiResponse(201, { admin }, 'Admin created successfully'));
});
