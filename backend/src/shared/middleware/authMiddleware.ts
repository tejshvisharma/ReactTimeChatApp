import  type { Request, Response, NextFunction } from 'express';
import {  getAuth } from '@clerk/express'
import { User } from '../../infrastructure/db/models/user.model';
import { NotFoundError, UnauthorizedError } from '../errors/AppError';

export type AuthRequest = Request & {
    userId?: string;
};

export const isLoggedIn = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { userId: clerkId } = getAuth(req);
        if (!clerkId) {
            throw new UnauthorizedError("Unauthorized : clerkId not found");
        }
        const user = await User.findOne({ clerkId });

        if (!user) {
            throw new NotFoundError("Unauthorized : User not found");
        }

        req.userId = user._id.toString();
        next();
    } catch (error) {
        next(error);
    }
};

