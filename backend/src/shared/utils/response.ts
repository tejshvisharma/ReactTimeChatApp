import type { Response } from "express";

export class ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T | null;

  constructor(statusCode: number, message: string, data: T | null = null) {
    this.success = statusCode < 400;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}

export function apiResponse<T>(
  res: Response,
  statusCode: number,
  message: string,
  data: T | null = null
): Response {
  return res.status(statusCode).json(new ApiResponse(statusCode, message, data));
}