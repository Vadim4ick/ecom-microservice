import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { clerkMiddleware } from "@hono/clerk-auth";
import { shouldByUser } from "./middleware/authMiddleware";

const app = new Hono();

app.use("*", clerkMiddleware());

app.get("/health", (c) => {
  return c.json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

app.get("/test", shouldByUser, (c) => {
  return c.json({
    message: "Payment service authenticated",
    userId: c.get("userId"),
  });
});

const start = async () => {
  try {
    serve(
      {
        fetch: app.fetch,
        port: 8002,
      },
      (info) => {
        console.log(`server listening on 8002`);
      },
    );
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
