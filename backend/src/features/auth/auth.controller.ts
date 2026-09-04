import { Request, Response, CookieOptions } from 'express';
import { AuthService } from './auth.service.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { env } from '../../config/env.js';

const COOKIE_NAME = 'accessToken';

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
};

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { admin, token } = await AuthService.login(req.body);
  res
    .status(200)
    .cookie(COOKIE_NAME, token, cookieOptions)
    .json(new ApiResponse(200, { admin }, 'Login successful'));
});

export const logout = asyncHandler(async (_req: Request, res: Response) => {
  res
    .status(200)
    .clearCookie(COOKIE_NAME, cookieOptions)
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
