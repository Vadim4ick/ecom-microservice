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

export async function publishPaymentSuccess(paymentData: any) {
  try {
    await ensureConnected();

    await producer.send({
      topic: "payment-success",
      messages: [
        {
          key: paymentData.email,
          value: JSON.stringify(paymentData),
        },
      ],
    });

    console.log("Payment event published:", paymentData.paymentId);
  } catch (error) {
    console.error("Error publishing to Kafka:", error);
    throw error;
  }
}

process.on("SIGTERM", async () => {
  if (isConnected) {
    await producer.disconnect();
  }
});
