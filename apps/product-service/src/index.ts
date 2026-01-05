import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { shouldByUser } from "./middleware/authMiddleware";
import productRouter from "./routes/product.route";
import categoryRouter from "./routes/category.route";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(clerkMiddleware());

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

app.use("/product", productRouter);
app.use("/category", categoryRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);

  return res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

app.listen(8000, () => {
  console.log("Product service is running on port 8000");
});
