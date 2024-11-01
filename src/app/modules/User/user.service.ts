import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { UserRole, UserSearchableField } from "./user.constant";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { JwtPayload } from "jsonwebtoken";

const getAllUserFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(User.find(), query)
    .search(UserSearchableField)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await userQuery.modelQuery;
  const meta = await userQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getUserIntoDB = async (currentUser: JwtPayload) => {
  const userExists = (await User.findOne({
    email: currentUser?.email,
  })) as TUser;

  if (!userExists) {
    throw new AppError(httpStatus.NOT_FOUND, "User is not found!!");
  }

  return userExists;
};

const updateUserIntoDB = async (
  id: string,
  payload: Partial<TUser>,
  currentUser: JwtPayload
) => {
  const userExits = await User.findById(id);

  if (!userExits) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  // role updates to admins only
  if (payload.role && currentUser.role !== UserRole.admin) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Only admins can change user roles"
    );
  }

  // only 'user' role users can be promoted to 'admin'
  if (payload.role && currentUser.role === UserRole.admin) {
    if (userExits.role === UserRole.user && payload.role === UserRole.admin) {
      payload.role = UserRole.admin;
    } else if (userExits.role === UserRole.admin) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        "Admins cannot change the role of other admins"
      );
    }
  }

  // determine if the current user can block/unblock the target user
  const canModifyBlockStatus =
    currentUser.email === "jijetu2@gmail.com" ||
    userExits.role !== UserRole.admin;

  // blocking/unblocking if conditions are met
  if (payload.isBlocked !== undefined && currentUser.role === UserRole.admin) {
    if (!canModifyBlockStatus) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        "Only the specified admin can block/unblock other admins"
      );
    }
    userExits.isBlocked = payload.isBlocked;
  } else {
    delete payload.isBlocked;
  }

  // non-admins from changing role or isBlocked status
  if (currentUser.role !== UserRole.admin) {
    delete payload.role;
    delete payload.isBlocked;
  }

  if (!payload.userImage) {
    payload.userImage = userExits.userImage;
  }
  if (!payload.name) {
    payload.name = userExits.name;
  }
  if (!payload.email) {
    payload.email = userExits.email;
  }
  if (!payload.address) {
    payload.address = userExits.address;
  }

  // Update user information directly in the database
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

export const UserService = {
  getAllUserFromDB,
  getUserIntoDB,
  updateUserIntoDB,
};
