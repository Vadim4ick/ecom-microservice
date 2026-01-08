import { OrderSchemaType } from "@repo/order-db";
import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "payment-service",
  brokers: ["localhost:29092", "localhost:39092", "localhost:49092"],
});

const producer = kafka.producer();

let isConnected = false;

async function ensureConnected() {
  if (!isConnected) {
    await producer.connect();
    isConnected = true;
    console.log("Kafka producer connected");
  }
}

type PaymentCreatedEvent = {
  event: "payment.created";
} & Omit<OrderSchemaType, "createdAt" | "updatedAt">;

type PaymentSucceededEvent = {
  event: "payment.succeeded";
  orderId: string;
};

type PaymentFailedEvent = {
  event: "payment.failed";
  orderId: string;
};

type PaymentEvent =
  | PaymentCreatedEvent
  | PaymentSucceededEvent
  | PaymentFailedEvent;

export async function publishPaymentEvent(event: PaymentEvent) {
  try {
    await ensureConnected();

    await producer.send({
      topic: "payment-events",
      messages: [
        {
          key: event.orderId, // 🔑 ВСЕГДА orderId
          value: JSON.stringify(event),
        },
      ],
    });

    console.log(`[Kafka] ${event.event} published for order ${event.orderId}`);
  } catch (error) {
    console.error("[Kafka] publish error:", error);
    throw error;
  }
}

process.on("SIGTERM", async () => {
  if (isConnected) {
    await producer.disconnect();
  }
});
