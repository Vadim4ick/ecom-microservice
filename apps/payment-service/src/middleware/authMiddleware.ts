import { getAuth } from "@hono/clerk-auth";
import { createMiddleware } from "hono/factory";

export const shouldByUser = createMiddleware<{
  Variables: {
    userId: string;
  };
}>(async (c, next) => {
  const auth = getAuth(c);

  if (!auth?.userId) {
    return c.json({
      message: "Payment service not authenticated",
    });
  }

  c.set("userId", auth.userId);

  await next();
});
