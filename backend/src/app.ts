import express from "express";
import cors from "cors";
import routes from "./routes";
import { errorHandler } from "./shared/middleware/errorHandler";
import { NotFoundError } from "./shared/errors/AppError";
import { apiResponse } from "./shared/utils/response";
const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  apiResponse(res, 200, "API is healthy", { uptime: process.uptime(), timestamp: new Date().toISOString() });
});

app.use("/api", routes);

app.use((_req, _res, next) => {
  next(new NotFoundError("Route not found"));
});

app.use(errorHandler);

export default app;