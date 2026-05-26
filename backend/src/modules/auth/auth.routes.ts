import { Router } from "express";
import { isLoggedIn } from "../../shared/middleware/authMiddleware";
import { authCallback, getMe } from "./auth.controller";

const router = Router();

router.get("/me", isLoggedIn, getMe);
router.post("/callback", isLoggedIn, authCallback);






export default router;