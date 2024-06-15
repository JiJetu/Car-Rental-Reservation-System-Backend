// export type TUserRole = 'user' | 'admin';

import { UserRole } from "./user.constant";

export type TUser = {
    name: string;
    email: string;
    role: keyof typeof UserRole;
    password: string;
    phone: string;
    address: string;
  }