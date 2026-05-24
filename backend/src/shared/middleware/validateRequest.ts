import type { RequestHandler } from "express";
import { ZodTypeAny } from "zod";
import { BadRequestError } from "../errors/AppError";

type Source = "body" | "query" | "params";

export const validateRequest =
  (schema: ZodTypeAny, source: Source = "body"): RequestHandler =>
  (req, _res, next) => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      const message = result.error.issues.map((issue) => issue.message).join(", ");
      return next(new BadRequestError(message));
    }

    req[source] = result.data;
    next();
  };