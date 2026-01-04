import Fastify from "fastify";

const fastify = Fastify({
  logger: true,
});

fastify.get("/", async (req, res) => {
  return await res.send("Order service is running");
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
