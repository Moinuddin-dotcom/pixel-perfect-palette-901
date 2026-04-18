import mongoose from "mongoose";
import "./Category";
import "./Badge";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  badge: { type: mongoose.Schema.Types.ObjectId, ref: 'Badge' },
  brand: { type: String },
  variants: [{ type: String }],
  images: [{ type: String }],
  quantity: { type: Number, required: true, default: 0 },
  price: { type: Number, required: true },
  discountPrice: { type: Number },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

if (mongoose.models.Product) {
  delete mongoose.models.Product;
}
export const Product = mongoose.model("Product", productSchema);
