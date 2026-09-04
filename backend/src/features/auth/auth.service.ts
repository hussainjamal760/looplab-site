import jwt from 'jsonwebtoken';
import { Admin, IAdmin } from './auth.model.js';
import { LoginInput, CreateAdminInput } from './auth.validation.js';
import { ApiError } from '../../utils/ApiError.js';
import { env } from '../../config/env.js';

const GENERIC_AUTH_ERROR = 'Invalid email or password';

const signToken = (adminId: string, role: string): string =>
  jwt.sign({ adminId, role }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'],
  });

export class AuthService {
  /** Authenticate admin and return token + admin profile */
  static async login(input: LoginInput): Promise<{ admin: IAdmin; token: string }> {
    const admin = await Admin.findOne({ email: input.email });
    // Generic error — never reveal whether email exists
    if (!admin || !admin.isActive) throw new ApiError(401, GENERIC_AUTH_ERROR);

    const isMatch = await admin.comparePassword(input.password);
    if (!isMatch) throw new ApiError(401, GENERIC_AUTH_ERROR);

    admin.lastLoginAt = new Date();
    await admin.save();

    const token = signToken(String(admin._id), admin.role);
    return { admin, token };
  }

  /** Create a new admin (only callable by existing authenticated admin) */
  static async createAdmin(input: CreateAdminInput): Promise<IAdmin> {
    const exists = await Admin.findOne({ email: input.email });
    if (exists) throw new ApiError(409, 'An admin with this email already exists');
    return Admin.create(input);
  }

  /** Retrieve authenticated admin profile by ID */
  static async getAdminById(id: string): Promise<IAdmin> {
    const admin = await Admin.findById(id).select('-password').lean();
    if (!admin) throw new ApiError(404, 'Admin not found');
    return admin;
  }
}
