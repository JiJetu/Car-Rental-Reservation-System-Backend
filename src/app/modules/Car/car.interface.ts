import { CarStatus } from "./car.constant";

export type TCar = {
  name: string;
  description: string;
  color: string;
  isElectric: boolean;
  status: keyof typeof CarStatus;
  features: string[];
  pricePerHour: number;
  isDeleted: boolean;
}