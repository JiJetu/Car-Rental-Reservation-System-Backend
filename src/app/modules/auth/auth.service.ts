import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../errors/AppError";
import { User } from "../User/user.model";
import { TUser } from "./../User/user.interface";
import { TLogIn } from "./auth.interface";
import { isPasswordMatch } from "./auth.utils";
import jwt from "jsonwebtoken";

const signUpIntoDB = async (payload: TUser) => {
  const isUserExists = await User.isUserExists(payload.email);

  if (isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, "User is already exists");
  }

  const result = await User.create(payload);
  return result;
};

const logInIntoDB = async (payload: TLogIn) => {
  // finding user is exists or not and getting the password to verify
  const userExists = await User.findOne({ email: payload.email }).select(
    "+password"
  );

  console.log(userExists?.password);

  if (!userExists) {
    throw new AppError(httpStatus.NOT_FOUND, "user not found");
  }

  // checking password is matching or not with plain pass(request pass) and hash pass(DB pass)
  const matchedPassword = await isPasswordMatch(
    payload.password,
    userExists?.password
  );

  if (!matchedPassword) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid password");
  }

  const jwtPayload = {
    email: userExists.email,
    role: userExists.role,
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

  const {password, ...remainingUserData} = userExists.toObject()


  return {
    user: remainingUserData,
    accessToken,
  };
};

export const AuthServices = {
  signUpIntoDB,
  logInIntoDB,
};
