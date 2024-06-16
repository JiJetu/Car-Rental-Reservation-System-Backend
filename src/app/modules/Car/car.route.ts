import express from "express";
import { CarControllers } from "./car.controller";
import validateRequest from "../../middlewares/validateRequest";
import { CarValidations } from "./car.validation";
import auth from "../../middlewares/auth";
import { UserRole } from "../User/user.constant";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.admin),
  validateRequest(CarValidations.createCarValidationSchema),
  CarControllers.createCar
);

router.get("/", CarControllers.getAllCar);

router.get("/:carId", CarControllers.getSingleCar);

router.put(
  "/:carId",
  validateRequest(CarValidations.updateCarValidationSchema),
  CarControllers.updateCar
);

router.delete("/:carId", CarControllers.deleteCar);

export const CarRoutes = router;
