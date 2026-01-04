import { getAuth } from "@clerk/fastify";
import { FastifyReply, FastifyRequest } from "fastify";

declare module "fastify" {
  interface FastifyRequest {
    userId?: string;
  }
}

export const shouldByUser = async (req: FastifyRequest, res: FastifyReply) => {
  const { isAuthenticated, userId } = getAuth(req);

  if (!isAuthenticated) {
    return res.status(401).send({
      message: "Order Service not authenticated",
    });
  }

  req.userId = userId;
};
