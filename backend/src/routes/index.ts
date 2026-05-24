import { Router } from "express";
import { apiResponse } from "../shared/utils/response";
import { HttpStatus } from "../shared/constants/httpStatus";

const router = Router();

router.get("/health", (_req, res) => {
  return apiResponse(res, HttpStatus.OK, "API is healthy", {
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

export default router;