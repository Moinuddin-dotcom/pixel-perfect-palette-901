import { createServerFn } from "@tanstack/react-start";
import { connectDB } from "../db";
import { Product } from "../models/Product";
import { Category } from "../models/Category";
import { Badge } from "../models/Badge";
import { z } from "zod";

// Ensure models are registered to prevent "Schema hasn't been registered" in Vercel serverless builds
const _models = { Category, Badge };

const productSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().min(10),
  category: z.string(),
  badge: z.string().optional(),
  brand: z.string().optional(),
  variants: z.array(z.string()).optional(),
  images: z.array(z.string()).max(5),
  quantity: z.number().min(0),
  price: z.number().min(0),
  discountPrice: z.number().min(0).optional(),
});

export const createProductFn = createServerFn({ method: "POST" })
  .handler(async (ctx: { data: any }) => {
    const data = productSchema.parse(ctx.data);
    await connectDB();
    
    // Dynamically import cloudinary inside the server handler
    const cloudinary = (await import("cloudinary")).v2;
    if (process.env.CLOUDINARY_URL) {
      cloudinary.config({ secure: true });
    }

    // Upload base64 images to Cloudinary
    const uploadedImages: string[] = [];
    for (const image of data.images) {
      if (image.startsWith('data:image')) {
        const uploadRes = await cloudinary.uploader.upload(image, {
          folder: "gadgethive/products",
        });
        uploadedImages.push(uploadRes.secure_url);
      } else {
        uploadedImages.push(image);
      }
    }
    
    const productData = { ...data, images: uploadedImages };
    const newProduct = new Product(productData);
    await newProduct.save();
    return JSON.parse(JSON.stringify(newProduct.toJSON()));
  });

export const getProducts = createServerFn({ method: "GET" })
  .handler(async () => {
    await connectDB();
    const products = await Product.find({})
      .populate('category', 'name')
      .populate('badge', 'name slug')
      .sort({ createdAt: -1 })
      .lean();
    return JSON.parse(JSON.stringify(products));
  });

export const getActiveProducts = createServerFn({ method: "GET" })
  .handler(async () => {
    await connectDB();
    const products = await Product.find({ isActive: true })
      .populate('category', 'name')
      .populate('badge', 'name slug')
      .sort({ createdAt: -1 })
      .lean();
    return JSON.parse(JSON.stringify(products));
  });

export const getProductBySlug = createServerFn({ method: "GET" })
  .handler(async (ctx: { data: any }) => {
    const slug = ctx.data as string;
    await connectDB();
    const product = await Product.findOne({ slug })
      .populate('category', 'name')
      .populate('badge', 'name slug')
      .lean();
    
    if (!product) {
      throw new Error("Product not found");
    }
    
    return JSON.parse(JSON.stringify(product));
  });

export const deleteProductFn = createServerFn({ method: "POST" })
  .handler(async (ctx: { data: any }) => {
    const id = ctx.data as string;
    await connectDB();
    await Product.findByIdAndDelete(id);
    return { success: true };
  });

export const toggleProductStatusFn = createServerFn({ method: "POST" })
  .handler(async (ctx: { data: any }) => {
    const { id, isActive } = ctx.data as { id: string; isActive: boolean };
    await connectDB();
    const updated = await Product.findByIdAndUpdate(id, { isActive }, { new: true });
    return JSON.parse(JSON.stringify(updated));
  });
