import { readFileSync } from "fs";
import { join } from "path";
import { Booking } from "../booking/booking.model";
import { verifyPayment } from "./payment.utils";

const confirmationService = async (transactionId: string, status: string) => {
  const verifyResponse = await verifyPayment(transactionId);

  let message = "";

  if (verifyResponse && verifyResponse.pay_status === "Successful") {
    await Booking.findOneAndUpdate(
      { transactionId },
      { paymentStatus: true, transactionId },
      { new: true }
    )
      .populate("user")
      .populate("car");
    message = "Successfully Paid!";
  } else {
    message = "Payment Failed!";
  }

  const filePath = join(__dirname, "../../../views/conformation.html");
  let template = readFileSync(filePath, "utf-8");
  template = template
    .replace("{{message}}", message)
    .replace("{{status}}", status);
  return template;
};

export const paymentServices = {
  confirmationService,
};
