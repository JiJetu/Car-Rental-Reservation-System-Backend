/* eslint-disable no-unused-vars */
// export type TUserRole = 'user' | 'admin';

import { Model } from "mongoose";
import { UserRole } from "./user.constant";

export type TUserRole = keyof typeof UserRole;

export type TUser = {
  name: string;
  email: string;
  role: TUserRole;
  password: string;
  phone: string;
  address: string;
  isBlocked: boolean;
};

// for creating static
export interface UserModel extends Model<TUser> {
  isUserExists(email: string): Promise<TUser>;
}
