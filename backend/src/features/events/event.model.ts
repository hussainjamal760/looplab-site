import { Schema, model, Document, Types } from 'mongoose';

export type FieldType = 'text' | 'number' | 'email' | 'dropdown' | 'radio' | 'textarea' | 'checkbox';

export interface IFormField {
  fieldId: string;
  label: string;
  fieldType: FieldType;
  options: string[];
  isRequired: boolean;
  placeholder: string;
  order: number;
}

export interface IEvent extends Document {
  _id: Types.ObjectId;
  title: string;
  slug: string;
  description: string;
  category: 'Hackathon' | 'Workshop' | 'Summit';
  eventDate: Date | null;
  venue: string;
  baseFee: number;
  isActive: boolean;
  isLiveBanner: boolean;
  formFields: IFormField[];
  createdAt: Date;
  updatedAt: Date;
}

const formFieldSchema = new Schema<IFormField>(
  {
    fieldId: { type: String, required: true },
    label: { type: String, required: true },
    fieldType: {
      type: String,
      enum: ['text', 'number', 'email', 'dropdown', 'radio', 'textarea', 'checkbox'],
      required: true,
    },
    options: [{ type: String }],
    isRequired: { type: Boolean, default: true },
    placeholder: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { _id: false }
);

const eventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, default: '', maxlength: 2000 },
    category: { type: String, enum: ['Hackathon', 'Workshop', 'Summit'], default: 'Hackathon' },
    eventDate: { type: Date, default: null },
    venue: { type: String, default: '', maxlength: 300 },
    baseFee: { type: Number, default: 0, min: 0 },
    isActive: { type: Boolean, default: false },
    isLiveBanner: { type: Boolean, default: false },
    formFields: { type: [formFieldSchema], default: [] },
  },
  { timestamps: true }
);

eventSchema.index({ isActive: 1 });
eventSchema.index({ isLiveBanner: 1 });

export const Event = model<IEvent>('Event', eventSchema);
