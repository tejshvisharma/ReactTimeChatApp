import type { AuthRequest } from './../../shared/middleware/authMiddleware';
import type { Request, Response } from "express";
import { asyncHandler } from "../../shared/utils/asyncHandler";
import ChatService from "./chat.service";
import { successResponse } from "../../shared/utils/response";
import type { PaginationQuery, PaginatedResult } from "../../shared/utils/pagination";
import { BadRequestError, UnauthorizedError } from "../../shared/errors/AppError";
import type { IChat } from "../../infrastructure/db/models/chat.model";

/**
 * Controller to get paginated chats for the authenticated user.
 * - Validates user authentication
 * - Sanitizes and validates query params
 * - Returns formatted chat data (never raw DB models)
 */
export const getChats = asyncHandler(async (req: AuthRequest, res: Response) => {
    // Validate authentication
    if (!req.userId) {
        throw new UnauthorizedError("Unauthorized: userId not found");
    }

    // Validate and sanitize pagination query params
    let page = 1;
    let limit = 10;
    if (req.query.page && !isNaN(Number(req.query.page))) {
        page = Math.max(1, Number(req.query.page));
    }
    if (req.query.limit && !isNaN(Number(req.query.limit))) {
        limit = Math.max(1, Math.min(100, Number(req.query.limit))); // limit max page size
    }

    // Fetch paginated chats from service (now returns PaginatedResult)
    const paginatedChats: PaginatedResult<IChat> = await ChatService.getPaginatedChats({
        userId: req.userId.toString(),
        page,
        limit,
    });

    // Format chat data for response
    const formattedChats = paginatedChats.data.map((chat: IChat) => {
        // Find the other participant (for 1-1 chat)
        const otherParticipants = chat.participants.filter(
            (p) => p._id.toString() !== req.userId
        );
        return {
            id: chat._id,
            otherParticipants: otherParticipants ? otherParticipants : [],
            lastMessage: chat.lastMessage,
            lastMessageAt: chat.lastMessageAt
        };
    });

    // Return paginated response with meta
    successResponse(res, "Chats fetched successfully", {
        data: formattedChats,
        total: paginatedChats.total,
        page: paginatedChats.page,
        limit: paginatedChats.limit,
        totalPages: paginatedChats.totalPages
    });
});
/**
 * Controller to get or create a chat between two users.
 * @param AuthRequest
 * @param Response
 */
export const getOrCreateChat = asyncHandler(async (req: AuthRequest, res: Response) => {
    if (!req.userId) {
        throw new UnauthorizedError("Unauthorized: userId not found");
    }
    const  userId  = req.userId;
    const { participantId } = req.params;
    if(!participantId) 
        throw new UnauthorizedError("Unauthorized: participantId not found");
    if(participantId === userId){
        throw new BadRequestError("You cannot chat with yourself");
    }
    const chat = await ChatService.getOrCreateChat(userId, participantId);

    successResponse(res, "Chat fetched successfully", chat);
});