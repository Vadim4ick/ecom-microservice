import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Payment service is running");
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
