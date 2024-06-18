import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../User/user.constant";
import validateRequest from "../../middlewares/validateRequest";
import { BookingValidation } from "./booking.validation";
import { BookingController } from "./booking.controller";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.user),
  validateRequest(BookingValidation.createBookingSchema),
  BookingController.createBooking
);

router.get("/", auth(UserRole.admin), BookingController.getAllBooking);

router.get("/my-bookings", auth(UserRole.user), BookingController.userSingleBooking);

// router.put(
//   "/:carId",
//   auth(UserRole.admin),
//   validateRequest(CarValidations.updateCarValidationSchema),
//   CarControllers.updateCar
// );

// router.delete("/:carId", auth(UserRole.admin), CarControllers.deleteCar);

export const BookingRoutes = router;
