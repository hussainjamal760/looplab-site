import { Schema, model, Document, Model, Types } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IAdmin extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'superadmin';
  isActive: boolean;
  lastLoginAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidate: string): Promise<boolean>;
}

interface IAdminModel extends Model<IAdmin> {
  findByEmail(email: string): Promise<IAdmin | null>;
}

type AdminReturnDoc = Record<string, unknown>;

const adminSchema = new Schema<IAdmin, IAdminModel>(
  {
    name:        { type: String, required: [true, 'Name is required'], trim: true, maxlength: 100 },
    email:       { type: String, required: [true, 'Email is required'], unique: true, lowercase: true, trim: true },
    password:    { type: String, required: [true, 'Password is required'], minlength: 8 },
    role:        { type: String, enum: ['admin', 'superadmin'], default: 'admin' },
    isActive:    { type: Boolean, default: true },
    lastLoginAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret: AdminReturnDoc) => {
        ret['password'] = undefined;
        ret['__v']      = undefined;
        return ret;
      },
    },
  }
);

adminSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 12);
});

adminSchema.methods.comparePassword = function (candidate: string): Promise<boolean> {
  return bcrypt.compare(candidate, this.password as string);
};

adminSchema.statics.findByEmail = function (email: string) {
  return this.findOne({ email: email.toLowerCase() });
};

export const Admin = model<IAdmin, IAdminModel>('Admin', adminSchema);
