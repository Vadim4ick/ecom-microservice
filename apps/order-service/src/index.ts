import Fastify from "fastify";

import { clerkPlugin } from "@clerk/fastify";
import { shouldByUser } from "./middleware/authMiddleware";

const fastify = Fastify({
  logger: true,
});

fastify.register(clerkPlugin);

fastify.get("/health", async (req, res) => {
  return res.status(200).send({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

fastify.get("/test", { preHandler: shouldByUser }, async (req, res) => {
  return res
    .status(200)
    .send({ message: "Order Service authenticated", userId: req.userId });
});

const start = async () => {
  try {
    await fastify.listen({
      port: 8001,
    });

    fastify.log.info(`server listening on 8001`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
