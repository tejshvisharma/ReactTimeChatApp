import { Router } from "express";
import { isLoggedIn } from "../../shared/middleware/authMiddleware";
import { getChats, getOrCreateChat } from "./chat.controller";

const router = Router();

router.use(isLoggedIn);

router.get("/", getChats);

router.post("/with/:participantId", getOrCreateChat);

export default router;