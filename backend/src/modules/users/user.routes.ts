import { Router } from "express";
import { getUsers } from "./user.controller";

const router = Router();

// GET /api/users?page=1&limit=10
router.get("/", getUsers);

export default router;