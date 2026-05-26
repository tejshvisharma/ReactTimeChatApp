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

export function successResponse<T>(
  res: Response,
  message = "Success",
  data: T
): Response {
  return apiResponse(res, 200, message, data);
}

/**
 * 200 OK without data
 */
export function successMessage(
  res: Response,
  message = "Success"
): Response {
  return apiResponse(res, 200, message, null);
}

/**
 * 201 Created
 */
export function createdResponse<T>(
  res: Response,
  message = "Resource created successfully",
  data: T
): Response {
  return apiResponse(res, 201, message, data);
}

/**
 * 204 No Content
 */
export function noContentResponse(res: Response): Response {
  return apiResponse(res, 204, "No content");
}