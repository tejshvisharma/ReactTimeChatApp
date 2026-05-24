import { Router } from "express";

const apiResponse = (
  res: {
    status: (code: number) => { json: (body: unknown) => unknown };
  },
  statusCode: number,
  message: string,
  data: unknown = null
) => {
  return res.status(statusCode).json({
    success: statusCode >= 200 && statusCode < 300,
    statusCode,
    message,
    data,
  });
};

const router = Router();

router.get("/", (_req, res) => {
  return apiResponse(res, 200, "Messages route working");
});

export default router;