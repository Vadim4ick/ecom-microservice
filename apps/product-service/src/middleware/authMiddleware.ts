import { getAuth } from "@clerk/express";
import { NextFunction, Request, Response } from "express";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const shouldByUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const auth = getAuth(req);

  if (!auth?.userId) {
    return res.status(401).json({
      message: "Product Service not authenticated",
    });
  }

  req.userId = auth.userId;

  await next();
};
