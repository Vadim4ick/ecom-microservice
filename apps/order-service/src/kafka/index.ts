import { Order } from "@repo/order-db";
import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "order-service",
  brokers: ["localhost:29092", "localhost:39092", "localhost:49092"],
});

const consumer = kafka.consumer({ groupId: "order-service-group" });

export async function startKafkaConsumer() {
  try {
    await consumer.connect();
    console.log("Kafka consumer connected");

    await consumer.subscribe({
      topic: "payment-success",
      fromBeginning: false,
    });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          const event = JSON.parse(message.value!.toString());
          console.log("Payment event received:", event);

          await Order.create({
            userId: event.userId,
            email: event.email,
            amount: event.amount,
            status: "success",
            products: event.products,
          });

          console.log("Order created successfully for:", event.email);
        } catch (error) {
          console.error("Error creating order:", error);
        }
      },
    });
  } catch (error) {
    console.error("Error starting Kafka consumer:", error);
    throw error;
  }
}

process.on("SIGTERM", async () => {
  await consumer.disconnect();
});
