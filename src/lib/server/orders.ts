import { createServerFn } from "@tanstack/react-start";
import { connectDB } from "../db";
import { Order } from "../models/Order";
import { z } from "zod";

const createOrderSchema = z.object({
  productName: z.string(),
  quantity: z.number().min(1),
  price: z.number().min(0),
  deliveryLocation: z.string().min(5),
  paymentMethod: z.enum(["sslcommerz", "cod"]),
});

export const createOrderFn = createServerFn({ method: "POST" })
  .handler(async (ctx: { data: any }) => {
    const data = createOrderSchema.parse(ctx.data);
    await connectDB();

    const totalAmount = data.quantity * data.price;
    const transactionId = `TXN-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const newOrder = new Order({
      productName: data.productName,
      quantity: data.quantity,
      price: data.price,
      totalAmount,
      deliveryLocation: data.deliveryLocation,
      paymentMethod: data.paymentMethod,
      paymentStatus: data.paymentMethod === "cod" ? "pending" : "pending",
      transactionId,
    });

    await newOrder.save();

    if (data.paymentMethod === "sslcommerz") {
      // MOCK SSL COMMERZ INITIALIZATION
      // In a real application, you would use sslcommerz-lts or make an API call to SSLCommerz here
      // and return the GatewayURL to redirect the user.
      // For now, we'll return a mocked URL to simulate the payment page.
      return { 
        success: true, 
        orderId: newOrder._id.toString(),
        transactionId,
        paymentUrl: `/payment/sslcommerz-mock?transactionId=${transactionId}&amount=${totalAmount}` 
      };
    }

    return { success: true, orderId: newOrder._id.toString(), transactionId };
  });

export const getOrdersFn = createServerFn({ method: "GET" })
  .handler(async () => {
    await connectDB();
    const orders = await Order.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(orders));
  });

export const updatePaymentStatusFn = createServerFn({ method: "POST" })
  .handler(async (ctx: { data: any }) => {
    const { transactionId, status } = ctx.data as { transactionId: string; status: "success" | "failed" };
    await connectDB();
    await Order.findOneAndUpdate({ transactionId }, { paymentStatus: status });
    return { success: true };
  });
