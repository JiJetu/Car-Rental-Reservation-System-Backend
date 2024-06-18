import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TCar, TReturnCar } from "./car.interface";
import { Car } from "./car.model";
import { JwtPayload } from "jsonwebtoken";
import { TBooking } from "../booking/booking.interface";
import { Booking } from "../booking/booking.model";
import { User } from "../User/user.model";
import mongoose from "mongoose";

const createCarIntoDB = async (payload: TCar) => {
  const result = await Car.create(payload);

  return result;
};

const getAllCarFromDB = async () => {
  const result = await Car.find();

  return result;
};

const getSingleCarFromDB = async (id: string) => {
  const result = await Car.findById(id);

  return result;
};

const updateCarIntoDB = async (id: string, payload: Partial<TCar>) => {
  const carExists = await Car.findById(id);

  if (!carExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Car is not found!!");
  }

  const result = await Car.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

const returnCardIntoDB = async (user: JwtPayload, payload:TReturnCar) => {
  const userExists = await User.findOne({email: user.email});

  if (!userExists) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized access");
  }

  const session = await mongoose.startSession()

  try {
    session.startTransaction();
    
    const result = await Booking.findByIdAndUpdate(payload?.bookingId, {endTime: payload.endTime}, {
      new: true,
    });
  
    return result;
  } catch (error) {
    
  }
};

const deleteCarIntoDB = async (id: string) => {
  const deletedUser = await Car.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );

  if (!deletedUser) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete user");
  }
  return deletedUser;
};

export const CarService = {
  createCarIntoDB,
  getAllCarFromDB,
  getSingleCarFromDB,
  updateCarIntoDB,
  deleteCarIntoDB,
  returnCardIntoDB,
};
