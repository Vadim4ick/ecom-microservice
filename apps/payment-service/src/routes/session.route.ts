import { Hono } from "hono";
import stripe from "../utils/stripe";
import { CartItemsType } from "@repo/types";
import { getStripeProductPrice } from "../utils/stripeProduct";
import { shouldByUser } from "../middleware/authMiddleware";

const sessionRoute = new Hono();

sessionRoute.post("/create-checkout-session", shouldByUser, async (c) => {
  const { cart }: { cart: CartItemsType } = await c.req.json();
  const userId = c.get("userId");

  try {
    const lineItems = cart.map((item) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100), // конвертируй доллары в центы
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      client_reference_id: userId,
      mode: "payment",
      ui_mode: "custom",
      return_url:
        "http://localhost:3000/return?session_id={CHECKOUT_SESSION_ID}",
    });

    return c.json({ checkoutSessionClientSecret: session.client_secret });
  } catch (error) {
    console.error("Checkout session error:", error);
    return c.json({ error: "Failed to create checkout session" }, 500);
  }
});

sessionRoute.get("/:session_id", async (c) => {
  const { session_id } = c.req.param();
  const session = await stripe.checkout.sessions.retrieve(
    session_id as string,
    {
      expand: ["line_items"],
    },
  );

  // console.log(session);

  return c.json({
    status: session.status,
    paymentStatus: session.payment_status,
  });
});

export default sessionRoute;
