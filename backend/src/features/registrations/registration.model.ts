import {
  Schema,
  model,
  Document,
  Types,
} from 'mongoose';

export type PaymentStatus =
  | 'pending'
  | 'verified'
  | 'rejected';

export interface IRegistration
  extends Document {
  _id: Types.ObjectId;

  eventId: Types.ObjectId;

  participantData: Record<
    string,
    unknown
  >;

  normalizedEmail: string | null;

  appliedPromoCode: string | null;

  baseAmount: number;
  discountAmount: number;
  finalAmount: number;

  paymentScreenshotUrl: string;

  paymentStatus: PaymentStatus;

  adminRemarks: string;

  verifiedBy: Types.ObjectId | null;
  verifiedAt: Date | null;

  certificateId: string | null;
  certificateIssuedAt: Date | null;

  ipAddress: string;

  submittedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const registrationSchema =
  new Schema<IRegistration>(
    {
      eventId: {
        type: Schema.Types.ObjectId,
        ref: 'Event',
        required: true,
      },

      participantData: {
        type: Schema.Types.Mixed,
        required: true,
      },

      normalizedEmail: {
        type: String,
        default: null,
        lowercase: true,
        trim: true,
      },

      appliedPromoCode: {
        type: String,
        default: null,
        uppercase: true,
        trim: true,
      },

      baseAmount: {
        type: Number,
        required: true,
        min: 0,
      },

      discountAmount: {
        type: Number,
        default: 0,
        min: 0,
      },

      finalAmount: {
        type: Number,
        required: true,
        min: 0,
      },

      paymentScreenshotUrl: {
        type: String,
        default: '',
        trim: true,
      },

      paymentStatus: {
        type: String,
        enum: [
          'pending',
          'verified',
          'rejected',
        ],
        default: 'pending',
      },

      adminRemarks: {
        type: String,
        default: '',
        maxlength: 1000,
      },

      verifiedBy: {
        type: Schema.Types.ObjectId,
        ref: 'Admin',
        default: null,
      },

      verifiedAt: {
        type: Date,
        default: null,
      },

      /*
       * Only approved registrations receive
       * a certificate ID.
       */
      certificateId: {
        type: String,
        default: null,
        uppercase: true,
        trim: true,
      },

      certificateIssuedAt: {
        type: Date,
        default: null,
      },

      ipAddress: {
        type: String,
        default: '',
      },

      submittedAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      timestamps: true,
    }
  );

registrationSchema.index({
  eventId: 1,
  paymentStatus: 1,
});

registrationSchema.index({
  submittedAt: -1,
});

registrationSchema.index({
  appliedPromoCode: 1,
});

/*
 * Duplicate registration protection.
 */
registrationSchema.index(
  {
    eventId: 1,
    normalizedEmail: 1,
  },
  {
    unique: true,

    partialFilterExpression: {
      normalizedEmail: {
        $type: 'string',
      },
    },
  }
);

/*
 * Certificate IDs are unique.
 * Null values are ignored by this index.
 */
registrationSchema.index(
  {
    certificateId: 1,
  },
  {
    unique: true,

    partialFilterExpression: {
      certificateId: {
        $type: 'string',
      },
    },
  }
);

export const Registration =
  model<IRegistration>(
    'Registration',
    registrationSchema
  );