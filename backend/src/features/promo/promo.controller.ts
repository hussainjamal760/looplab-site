import { Request, Response } from 'express';
import { PromoService } from './promo.service.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { ApiResponse } from '../../utils/ApiResponse.js';

export const validatePromoCode = asyncHandler(async (req: Request, res: Response) => {
  const result = await PromoService.validatePromoCode(req.body);
  res.status(200).json(new ApiResponse(200, result, 'Promo code is valid'));
});

export const getAllPromoCodes = asyncHandler(async (_req: Request, res: Response) => {
  const promoCodes = await PromoService.getAllPromoCodes();
  res.status(200).json(new ApiResponse(200, { promoCodes }, 'Promo codes fetched successfully'));
});

export const createPromoCode = asyncHandler(async (req: Request, res: Response) => {
  const promoCode = await PromoService.createPromoCode(req.body);
  res.status(201).json(new ApiResponse(201, { promoCode }, 'Promo code created successfully'));
});

export const togglePromoActive = asyncHandler(async (req: Request, res: Response) => {
  const { isActive } = req.body as { isActive: boolean };
  const promoCode = await PromoService.togglePromoActive(String(req.params['id']), isActive);
  res.status(200).json(new ApiResponse(200, { promoCode }, 'Promo code status updated'));
});
