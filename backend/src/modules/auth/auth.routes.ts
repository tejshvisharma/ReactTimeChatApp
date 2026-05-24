import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Auth route working",
    data: null,
  });
});

export default router;