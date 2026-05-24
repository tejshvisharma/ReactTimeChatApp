import type { ErrorRequestHandler } from "express";
import { AppError } from "../errors/AppError";
import { HttpStatus } from "../constants/httpStatus";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const isAppError = err instanceof AppError;

  const statusCode = isAppError
    ? err.statusCode
    : HttpStatus.INTERNAL_SERVER_ERROR;

  const message = isAppError ? err.message : "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV !== "production" && {
      stack: err instanceof Error ? err.stack : undefined,
    }),
  });
};