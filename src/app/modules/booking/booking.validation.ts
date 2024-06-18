import { z } from "zod";

const createBookingSchema = z.object({
  body: z.object({
    carId: z.string().min(1, { message: "Car ID is required" }),
    date: z.string({
      message:
        'Invalid date format, expected "YYYY-MM-DD" date format e.g:"2020-01-01"',
    }),
    startTime: z.string().refine(
      (time) => {
        const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
        return regex.test(time);
      },
      {
        message: 'Invalid time format , expected "HH:MM" in 24 hours format',
      }
    ),
  }),
});

const returnCarSchema = z.object({
  body: z.object({
    bookingId: z.string(),
    endTime: z.string().regex(/^([01]\d|2[0-3]):?([0-5]\d)$/, {
      message: "Invalid end time format",
    }),
  }),
});

export const BookingValidation = {
  createBookingSchema,
  returnCarSchema,
};
