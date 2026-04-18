import { createServerFn } from "@tanstack/react-start";
import { connectDB } from "../db";
import { Badge } from "../models/Badge";
import { z } from "zod";

export const getBadges = createServerFn({ method: "GET" })
  .handler(async () => {
    await connectDB();
    const badges = await Badge.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(badges));
  });

const badgeSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  slug: z.string().min(2),
});

export const createBadgeFn = createServerFn({ method: "POST" })
  .handler(async (ctx: { data: any }) => {
    const data = badgeSchema.parse(ctx.data);
    await connectDB();
    const newBadge = new Badge(data);
    await newBadge.save();
    return JSON.parse(JSON.stringify(newBadge));
  });

export const deleteBadgeFn = createServerFn({ method: "POST" })
  .handler(async (ctx: { data: any }) => {
    const id = ctx.data as string;
    await connectDB();
    await Badge.findByIdAndDelete(id);
    return { success: true };
  });

export const toggleBadgeStatusFn = createServerFn({ method: "POST" })
  .handler(async (ctx: { data: any }) => {
    const { id, isActive } = ctx.data as { id: string; isActive: boolean };
    await connectDB();
    const updated = await Badge.findByIdAndUpdate(id, { isActive }, { new: true });
    return JSON.parse(JSON.stringify(updated));
  });
