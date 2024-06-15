import express from "express";
import { AuthValidation } from "./auth.validation";
import { AuthController } from "./auth.controller";

const router = express.Router();

router.post(
  "/signup",
//   validateRequest(AuthValidation.loginValidationSchema),
  AuthController.registerUser
);

router.post(
  "/signin",
//   validateRequest(AuthValidation.loginValidationSchema),
  AuthController.loginUser
);

export const AuthRoutes = router;
