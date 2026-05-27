import type { Request, Response } from "express";
import { asyncHandler } from "../../shared/utils/asyncHandler";
import { successResponse } from "../../shared/utils/response";
import { UserService } from "./user.service";
import type { PaginationQuery } from "../../shared/utils/pagination";

export const getUsers = asyncHandler(async (req: Request, res: Response) => {
	const { page = 1, limit = 10 } = req.query as Partial<PaginationQuery>;
	const paginatedUsers = await UserService.getPaginatedUsers({
		page: Number(page),
		limit: Number(limit),
	});
	successResponse(res, "Users fetched successfully", paginatedUsers);
});
