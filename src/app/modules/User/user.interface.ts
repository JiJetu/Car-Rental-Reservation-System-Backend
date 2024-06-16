// export type TUserRole = 'user' | 'admin';

import { Model } from "mongoose";
import { UserRole } from "./user.constant";

export type TUser = {
  name: string;
  email: string;
  role: keyof typeof UserRole;
  password: string;
  phone: string;
  address: string;
};

// for creating static
export interface UserModel extends Model<TUser> {
  isUserExists(email: string): Promise<TUser>;
}
