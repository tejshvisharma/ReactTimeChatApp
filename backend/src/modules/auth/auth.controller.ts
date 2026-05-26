import { clerkClient, clerkMiddleware, getAuth } from '@clerk/express';
import type { Request, Response } from "express";
import { asyncHandler } from "../../shared/utils/asyncHandler";
import { AuthService } from "./auth.service";
import { NotFoundError, UnauthorizedError } from "../../shared/errors/AppError";
import { successResponse } from "../../shared/utils/response";

export const getMe = asyncHandler(async (req: any, res: Response): Promise<void> => {
  const userId = req.userId;

  if (!userId) {
    throw new UnauthorizedError("Unauthorized : userId not found");
  }

  const user = await AuthService.getCurrentUser(userId);

  if (!user) {
    throw new NotFoundError("User not found");
  }

 successResponse(
    res,
    "User Profile fetched successfully",
    user
  );
});

export const authCallback = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { userId: clerkId } = getAuth(req);

  if (!clerkId) {
    throw new UnauthorizedError("Unauthorized : clerkId not found");
  }

  let user = await AuthService.getCurrentUser(clerkId);

  if (!user) {
    const clerkUser = await clerkClient.users.getUser(clerkId);
    user = await AuthService.saveUserFromClerk(clerkUser);
  }

  successResponse(res, "User created successfully", user);
});