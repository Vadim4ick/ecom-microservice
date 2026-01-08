import { Kafka, Partitioners } from "kafkajs";

const kafka = new Kafka({
  clientId: "payment-service",
  brokers: [
    "localhost:29092", // broker-1
    "localhost:39092", // broker-2
    "localhost:49092", // broker-3 (leader для payment-events)
  ],
  retry: {
    retries: 8,
    initialRetryTime: 300,
  },
});

const producer = kafka.producer({
  createPartitioner: Partitioners.DefaultPartitioner,
  allowAutoTopicCreation: false, // ✅ Не создавать топики автоматически
  retry: {
    retries: 5,
  },
});

let isConnected = false;

async function ensureConnected() {
  if (!isConnected) {
    await producer.connect();
    isConnected = true;
    console.log("Kafka producer connected");
  }
}

type PaymentEvent = {
  event: "payment.created" | "payment.succeeded" | "payment.failed";
  paymentId: string;
  orderId: string;
  amount?: number;
  userId?: string;
  email?: string;
  products?: {
    name: string;
    quantity: number;
    price: number;
  }[];
  createdAt?: string;
};

export async function publishPaymentEvent(event: PaymentEvent) {
  try {
    await ensureConnected();

    await producer.send({
      topic: "payment-events",
      messages: [
        {
          key: event.orderId,
          value: JSON.stringify(event),
          // Не указываем partition - Kafka сам направит на broker-3
        },
      ],
    });

    console.log(`[Kafka] ${event.event} published for order ${event.orderId}`);
  } catch (error) {
    console.error("[Kafka] publish error:", error);
    // Не бросаем ошибку, чтобы не сломать payment flow
  }
}

process.on("SIGTERM", async () => {
  if (isConnected) {
    await producer.disconnect();
  }
});
