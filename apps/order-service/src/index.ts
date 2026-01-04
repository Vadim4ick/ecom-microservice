import Fastify from "fastify";

const fastify = Fastify({
  logger: true,
});

fastify.get("/health", async (req, res) => {
  return res.status(200).send({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

// fastify.get("/orders", async (req, res) => {});

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
