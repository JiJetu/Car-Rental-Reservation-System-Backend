import { Types } from "mongoose";

export type TBooking = {
  startDate: string;
  user: Types.ObjectId;
  car: Types.ObjectId;
  startTime: string;
  endDate: string;
  endTime: string;
  additionalFeatures: string[];
  additionalInsurance: string[];
  bookingConfirm?: boolean;
  canceledByUser?: boolean;
  totalCost: number;
  createdAt?: Date;
  updatedAt?: Date;
};
