import express from "express";
import { CarControllers } from "./car.controller";
import validateRequest from "../../middlewares/validateRequest";
import { CarValidations } from "./car.validation";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/",
  validateRequest(CarValidations.createCarValidationSchema),
  CarControllers.createCar
);

router.get("/",auth(), CarControllers.getAllCar);

router.get("/:carId", CarControllers.getSingleCar);

router.put(
  "/:carId",
  validateRequest(CarValidations.updateCarValidationSchema),
  CarControllers.updateCar
);

router.delete("/:carId", CarControllers.deleteCar);

export const CarRoutes = router;
