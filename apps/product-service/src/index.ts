import express, { Request, Response } from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { shouldByUser } from "./middleware/authMiddleware";

const app = express();
app.use(clerkMiddleware());

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  }),
);

app.get("/health", (req: Request, res: Response) => {
  return res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

app.get("/test", shouldByUser, (req: Request, res: Response) => {
  return res.json({
    message: "Product Service authenticated",
    userId: req.userId,
  });
});

app.listen(8000, () => {
  console.log("Product service is running on port 8000");
});
