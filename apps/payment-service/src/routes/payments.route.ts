import { randomUUID } from "crypto";
import { Hono } from "hono";
import { publishPaymentEvent } from "../kafka";

const app = new Hono();

const SHOP_ID = process.env.YOUKASSA_SHOP_ID;
const SECRET_KEY = process.env.YOUKASSA_SECRET_KEY;

export function authHeader() {
  const basic = Buffer.from(`${SHOP_ID}:${SECRET_KEY}`).toString("base64");
  return `Basic ${basic}`;
}

app.post("/create", async (c) => {
  const { shippingForm, method, total, cart } = await c.req.json();

  let paymentMethodType: string;
  switch (method) {
    case "card":
      paymentMethodType = "bank_card";
      break;
    case "sbol":
      paymentMethodType = "sberbank";
      break;
    case "applepay":
      paymentMethodType = "apple_pay";
      break;
    default:
      return c.json({ message: "Неподдерживаемый способ оплаты" }, 400);
  }

  const orderId = randomUUID();

  try {
    await publishPaymentEvent({
      event: "payment.created",
      status: "draft",
      orderId: orderId,
      amount: total,
      email: shippingForm.email,
      products: cart,
    });

    const paymentResponse = await fetch("https://api.yookassa.ru/v3/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader(),
        "Idempotence-Key": randomUUID(),
      },
      body: JSON.stringify({
        amount: { value: total, currency: "RUB" },
        capture: true,
        payment_method_data: { type: paymentMethodType },
        confirmation: {
          type: "redirect",
          return_url: "http://localhost:3000/return",
        },
        description: `Оплата заказа для ${shippingForm.name}`,
        metadata: { order_id: orderId },
      }),
    });

    if (!paymentResponse.ok) {
      const err = await paymentResponse.text();
      throw new Error(
        `YooKassa create error: ${paymentResponse.status} ${err}`,
      );
    }

    const data = await paymentResponse.json();

    return c.json({ paymentUrl: data.confirmation?.confirmation_url });
  } catch (error) {
    console.error("Payment create error:", error);
    return c.json({ message: "Ошибка при создании платежа" }, 500);
  }
});

app.post("/webhook", async (c) => {
  const payload = await c.req.json();

  const payment = payload.object;
  const paymentId = payment.id;
  const status = payment.status;
  const orderId = payment.metadata?.order_id;

  // console.log("Webhook received:", { paymentId, status, orderId });

  if (!orderId) {
    return c.json({ error: "orderId missing" }, 400);
  }

  if (status === "succeeded") {
    await publishPaymentEvent({
      event: "payment.succeeded",
      orderId,
    });
  }

  if (status === "canceled") {
    await publishPaymentEvent({
      event: "payment.failed",
      orderId,
    });
  }

  return c.json({ ok: true });
});

export default app;
