import { Types } from "mongoose";
import { CarStatus } from "./car.constant";

export type TCar = {
  name: string;
  shortDescription: string;
  description: string;
  color: string;
  location: string;
  carImage: string;
  type: string;
  isElectric: boolean;
  status: keyof typeof CarStatus;
  features: string[];
  pricePerHour: number;
  isDeleted: boolean;
};

export type TReturnCar = {
  bookingId: Types.ObjectId;
  endDate: string;
  endTime: string;
};
