import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
  productName: string;
  quantity: number;
  price: number;
  totalAmount: number;
  deliveryLocation: string;
  paymentMethod: "sslcommerz" | "cod";
  paymentStatus: "pending" | "success" | "failed";
  orderStatus: "pending" | "processing" | "shipped" | "delivered";
  transactionId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema(
  {
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    deliveryLocation: { type: String, required: true },
    paymentMethod: { type: String, enum: ["sslcommerz", "cod"], required: true },
    paymentStatus: { type: String, enum: ["pending", "success", "failed"], default: "pending" },
    orderStatus: { type: String, enum: ["pending", "processing", "shipped", "delivered"], default: "pending" },
    transactionId: { type: String },
  },
  { timestamps: true }
);

export const Order = mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);
