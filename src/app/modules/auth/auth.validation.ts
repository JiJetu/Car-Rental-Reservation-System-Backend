import { z } from "zod";

const loginValidationSchema = z.object({
    body:z.object({
        email: z.string().email(),
        password: z
      .string()
      .max(20, { message: "Password can not be more than 20 characters" }),
    })
})

const refreshTokenValidationSchema = z.object({
    cookies: z.object({
      refreshToken: z.string({
        required_error: 'Refresh token is required!',
      }),
    }),
  });
  

export const AuthValidation = {
    loginValidationSchema,
    refreshTokenValidationSchema
}