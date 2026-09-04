import { Schema, model, Document, Types } from 'mongoose';

export interface IPromoCode extends Document {
  _id: Types.ObjectId;
  code: string;
  partnerName: string;
  partnerType: 'ambassador' | 'community_partner';
  discountPercent: number;
  usageCount: number;
  maxUsage: number | null;
  isActive: boolean;
  eventId: Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
}

const promoCodeSchema = new Schema<IPromoCode>(
  {
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    partnerName: { type: String, required: true, trim: true, maxlength: 100 },
    partnerType: {
      type: String,
      enum: ['ambassador', 'community_partner'],
      required: true,
    },
    discountPercent: { type: Number, default: 10, min: 1, max: 100 },
    usageCount: { type: Number, default: 0, min: 0 },
    maxUsage: { type: Number, default: null, min: 1 },
    isActive: { type: Boolean, default: true },
    eventId: { type: Schema.Types.ObjectId, ref: 'Event', default: null },
  },
  { timestamps: true }
);

promoCodeSchema.index({ isActive: 1 });

export const PromoCode = model<IPromoCode>('PromoCode', promoCodeSchema);
