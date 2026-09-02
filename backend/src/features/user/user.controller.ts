import { Request, Response } from 'express';
import { UserService } from './user.service.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { ApiResponse } from '../../utils/ApiResponse.js';

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await UserService.createUser(req.body);
  return res.status(201).json(new ApiResponse(201, user, 'User created successfully'));
});

export const getUsers = asyncHandler(async (_req: Request, res: Response) => {
  const users = await UserService.getAllUsers();
  return res.status(200).json(new ApiResponse(200, users, 'Users fetched successfully'));
});

export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const userId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const user = await UserService.getUserById(userId);
  return res.status(200).json(new ApiResponse(200, user, 'User fetched successfully'));
});
