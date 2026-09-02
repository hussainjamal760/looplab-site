import { User, IUser } from './user.model.js';
import { CreateUserInput } from './user.validation.js';
import { ApiError } from '../../utils/ApiError.js';

export class UserService {
  public static async createUser(input: CreateUserInput): Promise<IUser> {
    const existingUser = await User.findOne({ email: input.email });
    if (existingUser) {
      throw new ApiError(409, 'User with this email already exists');
    }
    return await User.create(input);
  }

  public static async getAllUsers(): Promise<IUser[]> {
    return await User.find().sort({ createdAt: -1 });
  }

  public static async getUserById(id: string): Promise<IUser> {
    const user = await User.findById(id);
    if (!user) {
      throw new ApiError(404, 'User not found');
    }
    return user;
  }
}
