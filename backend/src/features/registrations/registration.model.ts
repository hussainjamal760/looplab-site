import { Schema, model, Document, Types } from 'mongoose';

export type PaymentStatus = 'pending' | 'verified' | 'rejected';

export interface IRegistration extends Document {
  _id: Types.ObjectId;
  eventId: Types.ObjectId;
  participantData: Record<string, unknown>;
  appliedPromoCode: string | null;
  baseAmount: number;
  discountAmount: number;
  finalAmount: number;
  paymentScreenshotUrl: string;
  paymentStatus: PaymentStatus;
  adminRemarks: string;
  verifiedBy: Types.ObjectId | null;
  verifiedAt: Date | null;
  ipAddress: string;
  submittedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const registrationSchema = new Schema<IRegistration>(
  {
    eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
    participantData: { type: Schema.Types.Mixed, required: true },
    appliedPromoCode: { type: String, default: null, uppercase: true },
    baseAmount: { type: Number, required: true, min: 0 },
    discountAmount: { type: Number, default: 0, min: 0 },
    finalAmount: { type: Number, required: true, min: 0 },
    paymentScreenshotUrl: { type: String, required: true },
    paymentStatus: {
      type: String,
      enum: ['pending', 'verified', 'rejected'],
      default: 'pending',
    },
    adminRemarks: { type: String, default: '' },
    verifiedBy: { type: Schema.Types.ObjectId, ref: 'Admin', default: null },
    verifiedAt: { type: Date, default: null },
    ipAddress: { type: String, default: '' },
    submittedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

registrationSchema.index({ eventId: 1, paymentStatus: 1 });
registrationSchema.index({ submittedAt: -1 });
registrationSchema.index({ appliedPromoCode: 1 });

export const Registration = model<IRegistration>('Registration', registrationSchema);
