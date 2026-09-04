import { PromoCode, IPromoCode } from './promo.model.js';
import { ValidatePromoInput, CreatePromoInput } from './promo.validation.js';
import { ApiError } from '../../utils/ApiError.js';

const INVALID_PROMO_MSG = 'Invalid or expired promo code';

const isUsageCapped = (promo: IPromoCode): boolean =>
  promo.maxUsage !== null && promo.usageCount >= promo.maxUsage;

const isEventScoped = (promo: IPromoCode, eventId: string): boolean =>
  promo.eventId !== null && String(promo.eventId) !== eventId;

export class PromoService {
  /** Validate a promo code for a given event (public) */
  static async validatePromoCode(input: ValidatePromoInput): Promise<{ discountPercent: number }> {
    const promo = await PromoCode.findOne({ code: input.code.toUpperCase() }).lean();
    // Single generic error — never expose which check failed
    if (!promo || !promo.isActive || isUsageCapped(promo) || isEventScoped(promo, input.eventId)) {
      throw new ApiError(400, INVALID_PROMO_MSG);
    }
    return { discountPercent: promo.discountPercent };
  }

  /** Get all promo codes for admin dashboard */
  static async getAllPromoCodes(): Promise<IPromoCode[]> {
    return PromoCode.find().sort({ createdAt: -1 }).lean();
  }

  /** Create a new promo code (admin) */
  static async createPromoCode(input: CreatePromoInput): Promise<IPromoCode> {
    const exists = await PromoCode.findOne({ code: input.code });
    if (exists) throw new ApiError(409, `Promo code "${input.code}" already exists`);
    return PromoCode.create(input);
  }

  /** Toggle a promo code active status (admin) */
  static async togglePromoActive(id: string, isActive: boolean): Promise<IPromoCode> {
    const promo = await PromoCode.findByIdAndUpdate(
      id,
      { $set: { isActive } },
      { new: true }
    ).lean();
    if (!promo) throw new ApiError(404, 'Promo code not found');
    return promo;
  }

  /**
   * Increment usage count — INTERNAL USE ONLY.
   * Called only by RegistrationService when a payment is verified.
   */
  static async incrementUsage(code: string): Promise<void> {
    await PromoCode.findOneAndUpdate(
      { code: code.toUpperCase() },
      { $inc: { usageCount: 1 } }
    );
  }
}
