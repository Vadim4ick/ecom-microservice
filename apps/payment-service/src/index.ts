import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { clerkMiddleware } from "@hono/clerk-auth";
import paymentRoute from "./routes/payments.route";
import { cors } from "hono/cors";

const app = new Hono();

app.use("*", clerkMiddleware());
app.use(
  "*",
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  }),
);

app.get("/health", (c) => {
  return c.json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

app.route("/payments", paymentRoute);

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
