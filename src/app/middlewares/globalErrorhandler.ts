import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError, ZodIssue } from "zod";
import { TErrorMessage } from "../interface/error";
import config from "../config";

const globalErrorhandler: ErrorRequestHandler = (err, req, res, next) => {
  // setting default values
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong!";
  let errorMessages: TErrorMessage = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  const handleZodError = (err: ZodError) => {
    const statusCode = 400;
    const errorMessages: TErrorMessage = err.issues.map((issue: ZodIssue) => {
      return {
        path: issue.path[issue.path.length - 1],
        message: issue.message,
      };
    });

    return {
      statusCode,
      message: "Validation Error",
      errorMessages,
    };
  };

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);

    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessages = simplifiedError?.errorMessages;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.NODE_ENV === "development" ? err?.stack : null,
  });
};

export default globalErrorhandler;
