import { createServerFn } from "@tanstack/react-start";
import { connectDB } from "../db";
import { Category } from "../models/Category";
import { z } from "zod";

export const getCategories = createServerFn({ method: "GET" })
  .handler(async () => {
    await connectDB();
    const categories = await Category.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(categories));
  });

const categorySchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  slug: z.string().min(2),
});

export const createCategoryFn = createServerFn({ method: "POST" })
  .handler(async (ctx: { data: any }) => {
    const data = categorySchema.parse(ctx.data);
    await connectDB();
    const newCategory = new Category(data);
    await newCategory.save();
    return JSON.parse(JSON.stringify(newCategory));
  });

export const deleteCategoryFn = createServerFn({ method: "POST" })
  .handler(async (ctx: { data: any }) => {
    const id = ctx.data as string;
    await connectDB();
    await Category.findByIdAndDelete(id);
    return { success: true };
  });

export const toggleCategoryStatusFn = createServerFn({ method: "POST" })
  .handler(async (ctx: { data: any }) => {
    const { id, isActive } = ctx.data as { id: string; isActive: boolean };
    await connectDB();
    const updated = await Category.findByIdAndUpdate(id, { isActive }, { new: true });
    return JSON.parse(JSON.stringify(updated));
  });
