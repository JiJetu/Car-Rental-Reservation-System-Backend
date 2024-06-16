import { Schema } from "mongoose";
import { TCar } from "./car.interface";
import { model } from "mongoose";
import { CarStatus } from "./car.constant";

const carSchema = new Schema<TCar>({
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    color: {
      type: String,
      required: [true, 'Color is required'],
      trim: true,
    },
    isElectric: {
      type: Boolean,
      required: [true, 'isElectric is required'],
    },
    status: {
      type: String,
      enum: Object.keys(CarStatus),
      default: CarStatus.available,
    },
    features: {
      type: [String],
      default: [],
    },
    pricePerHour: {
      type: Number,
      required: [true, 'Price per hour is required'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  }, {
    timestamps: true,
  });
  
  export const Car = model<TCar>('Car', carSchema);