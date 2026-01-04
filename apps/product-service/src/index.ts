import express, { Request, Response } from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  }),
);

app.get("/", (req: Request, res: Response) => {
  res.json("Product service is running");
});

app.listen(8000, () => {
  console.log("Product service is running on port 8000");
});
