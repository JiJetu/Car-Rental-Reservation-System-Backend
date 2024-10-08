import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import { Car } from "../Car/car.model";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../User/user.model";
import { CarStatus } from "../Car/car.constant";

const createBookingIntoDB = async (
  carId: string,
  payload: Partial<TBooking>,
  user: JwtPayload
) => {
  // check car is exists
  const carExists = await Car.findByIdAndUpdate(
    carId,
    { status: CarStatus.unavailable },
    { new: true }
  );
  if (!carExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Car is not found!!");
  }

  // check user is exists
  const userExists = await User.findOne({ email: user?.email });
  if (!userExists) {
    throw new AppError(httpStatus.NOT_FOUND, "User is not found!!");
  }

  payload.car = carExists._id;
  payload.user = userExists._id;

  const result = (
    await (await Booking.create(payload)).populate("user")
  ).populate("car");

  return result;
};

const getAllBookingFromDB = async (query: Record<string, unknown>) => {
  const { carId, date } = query;
  const queryObj: any = {};
  if (carId) {
    queryObj.car = carId;
  }
  if (date) {
    queryObj.date = date;
  }
  const result = await Booking.find(queryObj).populate("user").populate("car");

  return result;
};

const userSingleBookingFromDB = async (user: JwtPayload) => {
  const userExists = await User.findOne({ email: user?.email });
  if (!userExists) {
    throw new AppError(httpStatus.NOT_FOUND, "User is not found!!");
  }

  const result = await Booking.find({ user: userExists._id })
    .populate("user")
    .populate("car");

  return result;
};

const updateCarIntoDB = async (id: string, payload: Partial<TBooking>) => {
  const carExists = await Booking.findById(id);

  if (!carExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Car is not found!!");
  }

  const result = await Booking.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

const deleteCarIntoDB = async (id: string) => {
  const deletedUser = await Booking.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );

  if (!deletedUser) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete user");
  }
  return deletedUser;
};

export const BookingService = {
  createBookingIntoDB,
  getAllBookingFromDB,
  userSingleBookingFromDB,
  updateCarIntoDB,
  deleteCarIntoDB,
};
