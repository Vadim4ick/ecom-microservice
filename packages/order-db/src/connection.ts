import mongoose from "mongoose";

let isConnected = false;

export const connectOrderDb = async () => {
  if (isConnected) return;

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined");
  }

  try {
    await mongoose
      .connect(process.env.MONGODB_URI)
      .then(() => console.log("Connected to MongoDB"))
      .catch((err) => console.error("Connection error", err));

    isConnected = true;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
