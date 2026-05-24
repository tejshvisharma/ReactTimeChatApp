import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import userRoutes from "../modules/users/user.routes";
import chatRoutes from "../modules/chats/chat.routes";
import messageRoutes from "../modules/messages/message.routes";
import { apiResponse } from "../shared/utils/response";
import { HttpStatus } from "../shared/constants/httpStatus";

const router = Router();

router.get("/health", (_req, res) => {
  return apiResponse(res, HttpStatus.OK, "API is healthy", {
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/chats", chatRoutes);
router.use("/messages", messageRoutes);

export default router;