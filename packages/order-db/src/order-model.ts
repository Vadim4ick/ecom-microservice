import mongoose, { InferSchemaType, model } from "mongoose";
const { Schema } = mongoose;

// Должно быть:
export const OrderStatus = ["draft", "pending", "paid", "failed"];

const OrderSchema = new Schema(
  {
    orderId: { type: String, required: true, unique: true }, // ✅ Добавляем UUID
    email: { type: String, required: true },

    amount: { type: Number, required: true },

    status: {
      type: String,
      enum: OrderStatus,
      default: "draft",
      required: true,
    },

    products: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true },
);

export type OrderSchemaType = InferSchemaType<typeof OrderSchema>;

export const Order = model<OrderSchemaType>("Order", OrderSchema);
