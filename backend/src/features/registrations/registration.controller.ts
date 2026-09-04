import { Request, Response } from 'express';
import { RegistrationService } from './registration.service.js';
import { getDashboardMetrics } from './metrics.service.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { GetRegistrationsQuery, UpdateStatusInput } from './registration.validation.js';

export const createRegistration = asyncHandler(async (req: Request, res: Response) => {
  const ipAddress = req.ip ?? req.socket.remoteAddress ?? '';
  const registration = await RegistrationService.createRegistration(req.body, ipAddress);
  res.status(201).json(new ApiResponse(201, { registration }, 'Registration submitted successfully'));
});

export const getAllRegistrations = asyncHandler(async (req: Request, res: Response) => {
  const result = await RegistrationService.getAllRegistrations(
    req.query as unknown as GetRegistrationsQuery
  );
  res.status(200).json(new ApiResponse(200, result, 'Registrations fetched successfully'));
});

export const getRegistrationById = asyncHandler(async (req: Request, res: Response) => {
  const id = String(req.params['id']);
  const registration = await RegistrationService.getRegistrationById(id);
  res.status(200).json(new ApiResponse(200, { registration }, 'Registration fetched successfully'));
});

export const updateRegistrationStatus = asyncHandler(async (req: Request, res: Response) => {
  const id = String(req.params['id']);
  const adminId = String(req.admin?._id);
  const registration = await RegistrationService.updateRegistrationStatus(
    id,
    req.body as UpdateStatusInput,
    adminId
  );
  res.status(200).json(new ApiResponse(200, { registration }, 'Registration status updated'));
});

export const getMetrics = asyncHandler(async (_req: Request, res: Response) => {
  const metrics = await getDashboardMetrics();
  res.status(200).json(new ApiResponse(200, metrics, 'Dashboard metrics fetched'));
});
