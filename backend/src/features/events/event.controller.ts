import { Request, Response } from 'express';
import { EventService } from './event.service.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { ApiResponse } from '../../utils/ApiResponse.js';

export const getActiveEvent = asyncHandler(async (_req: Request, res: Response) => {
  const event = await EventService.getActiveEvent();
  res.status(200).json(new ApiResponse(200, { event }, 'Active event fetched'));
});

export const getEventBySlug = asyncHandler(async (req: Request, res: Response) => {
  const event = await EventService.getEventBySlug(String(req.params['slug']));
  res.status(200).json(new ApiResponse(200, { event }, 'Event fetched successfully'));
});

export const getAllEvents = asyncHandler(async (_req: Request, res: Response) => {
  const events = await EventService.getAllEvents();
  res.status(200).json(new ApiResponse(200, { events }, 'Events fetched successfully'));
});

export const createEvent = asyncHandler(async (req: Request, res: Response) => {
  const event = await EventService.createEvent(req.body);
  res.status(201).json(new ApiResponse(201, { event }, 'Event created successfully'));
});

export const updateEvent = asyncHandler(async (req: Request, res: Response) => {
  const event = await EventService.updateEvent(String(req.params['id']), req.body);
  res.status(200).json(new ApiResponse(200, { event }, 'Event updated successfully'));
});

export const toggleBanner = asyncHandler(async (req: Request, res: Response) => {
  const { isLiveBanner } = req.body as { isLiveBanner: boolean };
  const event = await EventService.toggleBanner(String(req.params['id']), isLiveBanner);
  res.status(200).json(new ApiResponse(200, { event }, 'Banner status updated'));
});

export const deleteEvent = asyncHandler(async (req: Request, res: Response) => {
  await EventService.deleteEvent(String(req.params['id']));
  res.status(200).json(new ApiResponse(200, null, 'Event deleted successfully'));
});
