import mongoose from 'mongoose';
import { Event, IEvent } from './event.model.js';
import { CreateEventInput, UpdateEventInput } from './event.validation.js';
import { ApiError } from '../../utils/ApiError.js';

const generateSlug = (title: string): string =>
  title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

const assertEventExists = async (id: string): Promise<IEvent> => {
  const event = await Event.findById(id);
  if (!event) throw new ApiError(404, 'Event not found');
  return event;
};

export class EventService {
  /** Get the currently live banner event (public) */
  static async getActiveEvent(): Promise<IEvent | null> {
    return Event.findOne({ isLiveBanner: true, isActive: true }).lean();
  }

  /** Get event by slug with form fields (public — registration page) */
  static async getEventBySlug(slug: string): Promise<IEvent> {
    const event = await Event.findOne({ slug: slug.toLowerCase() }).lean();
    if (!event) throw new ApiError(404, `Event "${slug}" not found`);
    return event;
  }

  /** Get all events for admin dashboard */
  static async getAllEvents(): Promise<IEvent[]> {
    return Event.find().sort({ createdAt: -1 }).lean();
  }

  /** Create a new event; auto-generate slug if not provided */
  static async createEvent(input: CreateEventInput): Promise<IEvent> {
    const slug = input.slug ?? generateSlug(input.title);
    const slugExists = await Event.findOne({ slug });
    if (slugExists) throw new ApiError(409, `Slug "${slug}" is already taken`);
    return Event.create({ ...input, slug });
  }

  /** Partially update an event */
  static async updateEvent(id: string, input: UpdateEventInput): Promise<IEvent> {
    const updated = await Event.findByIdAndUpdate(
      id,
      { $set: input },
      { new: true, runValidators: true }
    ).lean();
    if (!updated) throw new ApiError(404, 'Event not found');
    return updated;
  }

  /**
   * Toggle live banner — only ONE event can be live banner at a time.
   * Uses a MongoDB session to atomically clear others and set this one.
   */
  static async toggleBanner(id: string, isLiveBanner: boolean): Promise<IEvent> {
    const session = await mongoose.startSession();
    try {
      let updatedEvent: IEvent | null = null;
      await session.withTransaction(async () => {
        if (isLiveBanner) {
          await Event.updateMany({ isLiveBanner: true }, { $set: { isLiveBanner: false } }, { session });
        }
        updatedEvent = await Event.findByIdAndUpdate(
          id,
          { $set: { isLiveBanner } },
          { new: true, session }
        ).lean();
      });
      if (!updatedEvent) throw new ApiError(404, 'Event not found');
      return updatedEvent;
    } finally {
      await session.endSession();
    }
  }

  /** Delete event (only if no registrations exist) */
  static async deleteEvent(id: string): Promise<void> {
    const event = await assertEventExists(id);
    // Dynamically import to avoid circular dep
    const { Registration } = await import('../registrations/registration.model.js');
    const regCount = await Registration.countDocuments({ eventId: event._id });
    if (regCount > 0) {
      throw new ApiError(409, `Cannot delete: ${regCount} registration(s) exist for this event`);
    }
    await Event.findByIdAndDelete(id);
  }
}
