import nodemailer from "nodemailer";
import config from "../config";

const emailUser = config.email_user;
const emailPass = config.email_pass;

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com.",
    port: 587,
    secure: config.NODE_ENV === "production", // true for port 465, false for other ports
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });

  await transporter.sendMail({
    from: "jijetu2@gmail.com", // sender address
    to, // list of receivers
    subject: "Reset your password within 5 mins!", // Subject line
    text: "",
    html, // html body
  });
};