import config from "../../config";
import { User } from "../User/user.model";
import { TUser } from "./../User/user.interface";
import { TLogIn } from "./auth.interface";
import { isPasswordMatch } from "./auth.utils";
import jwt from "jsonwebtoken";

const signUpIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const logInIntoDB = async (payload: TLogIn) => {
  // finding user is exists or not and getting the password to verify
  const user = await User.findOne({ email: payload.email }).select("+password");

  if (!user) {
    throw new Error("user not found");
  }

  // checking password is matching or not with plain pass(request pass) and hash pass(DB pass)
  const matchedPassword = await isPasswordMatch(
    payload.password,
    user?.password
  );

  if (!matchedPassword) {
    throw new Error("Invalid password");
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  // creating access token
  const accessToken = jwt.sign(jwtPayload, config.JWT_ACCESS_SECRET as string, {
    expiresIn: config.jwt_access_expires_in,
  });

  // creating refresh token
  const refreshToken = jwt.sign(
    jwtPayload,
    config.JWT_REFRESH_SECRET as string,
    {
      expiresIn: config.jwt_refresh_expires_in,
    }
  );

  return user;
};

export const AuthServices = {
  signUpIntoDB,
  logInIntoDB,
};
