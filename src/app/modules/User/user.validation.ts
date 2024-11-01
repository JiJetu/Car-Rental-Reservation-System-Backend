import { z } from "zod";
import { UserRole } from "./user.constant";

export const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    role: z.nativeEnum(UserRole),
    password: z
      .string()
      .max(20, { message: "Password can not be more than 20 characters" })
      .optional(),
    phone: z.string(),
    address: z.string(),
    isBlocked: z.boolean().default(false),
  }),
});

export const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    role: z.nativeEnum(UserRole).optional(),
    password: z
      .string()
      .max(20, { message: "Password can not be more than 20 characters" })
      .optional(),
    phone: z.string().optional(),
    userImage: z.string().optional(),
    address: z.string().optional(),
    isBlocked: z.boolean().optional(),
  }),
});

export const UserValidations = {
  createUserValidationSchema,
  updateUserValidationSchema,
};
