import mongoose from "mongoose";
import "./Category";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  brand: { type: String },
  variants: [{ type: String }],
  images: [{ type: String }],
  quantity: { type: Number, required: true, default: 0 },
  price: { type: Number, required: true },
  discountPrice: { type: Number },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
