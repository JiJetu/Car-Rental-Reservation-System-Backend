import { z } from "zod";
import { UserRole } from "./user.constant";

export const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    role: z.nativeEnum(UserRole),
    password: z
      .string()
      .max(20, { message: "Password can not be more than 20 characters" }).optional(),
    phone: z.string(),
    address: z.string(),
  }),
});

export const UserValidations = {
  createUserValidationSchema,
};
