import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({ message: "Chats route working" });
});

export default router;