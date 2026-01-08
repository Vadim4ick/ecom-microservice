import { Kafka } from "kafkajs";
import { Order } from "@repo/order-db";

const kafka = new Kafka({
  clientId: "order-service",
  brokers: ["localhost:29092", "localhost:39092", "localhost:49092"],
});

const consumer = kafka.consumer({ groupId: "order-service-group" });

export async function startConsumer() {
  await consumer.connect();
  await consumer.subscribe({ topic: "payment-events", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      try {
        const event = JSON.parse(message.value!.toString());

        console.log("event.event", event.event);
        switch (event.event) {
          case "payment.created":
            await Order.create({
              orderId: event.orderId,
              email: event.email,
              amount: event.amount,
              products: event.products,
              status: event.status,
            });
            console.log("Order created:", event.orderId);
            break;

          case "payment.succeeded":
            const orderPaid = await Order.findOne({ orderId: event.orderId });
            if (orderPaid) {
              orderPaid.status = "paid";

              await orderPaid.save();
            }
            break;

          case "payment.failed":
            const orderFailed = await Order.findOne({ orderId: event.orderId });
            if (orderFailed) {
              orderFailed.status = "failed";

              await orderFailed.save();
            }
            break;
        }
      } catch (err) {
        console.error("Error parsing message:", err);
      }
    },
  });
}
