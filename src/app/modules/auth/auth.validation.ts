import { z } from "zod";

const loginValidationSchema = z.object({
    body:z.object({
        email: z.string().email(),
        password: z
      .string()
      .max(20, { message: "Password can not be more than 20 characters" }),
    })
})

export const AuthValidation = {
    loginValidationSchema
}