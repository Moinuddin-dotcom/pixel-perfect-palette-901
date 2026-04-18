import { c as createServerRpc, a as connectDB } from "./db-D7RdFR-B.mjs";
import { m as mongoose } from "../_libs/mongoose.mjs";
import { c as createServerFn } from "./index.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, n as numberType, a as arrayType, s as stringType } from "../_libs/zod.mjs";
import "events";
import "assert";
import "../_libs/mongodb.mjs";
import "fs";
import "http";
import "process";
import "timers";
import "timers/promises";
import "dns";
import "os";
import "url";
import "zlib";
import "net";
import "fs/promises";
import "tls";
import "child_process";
import "../_libs/bson.mjs";
import "crypto";
import "stream";
import "util";
import "../_libs/mongodb-connection-string-url.mjs";
import "../_libs/whatwg-url.mjs";
import "../_libs/webidl-conversions.mjs";
import "../_libs/tr46.mjs";
import "../_libs/punycode.mjs";
import "../_libs/mongodb-js__saslprep.mjs";
import "../_libs/sparse-bitfield.mjs";
import "../_libs/memory-pager.mjs";
import "../_libs/kareem.mjs";
import "../_libs/ms.mjs";
import "../_libs/mpath.mjs";
import "../_libs/mquery.mjs";
import "../_libs/sift.mjs";
import "async_hooks";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "../_libs/isbot.mjs";
const productSchema$1 = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  brand: { type: String },
  variants: [{ type: String }],
  images: [{ type: String }],
  quantity: { type: Number, required: true, default: 0 },
  price: { type: Number, required: true },
  discountPrice: { type: Number },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});
const Product = mongoose.models.Product || mongoose.model("Product", productSchema$1);
const productSchema = objectType({
  name: stringType().min(2),
  slug: stringType().min(2),
  description: stringType().min(10),
  category: stringType(),
  brand: stringType().optional(),
  variants: arrayType(stringType()).optional(),
  images: arrayType(stringType()).max(5),
  quantity: numberType().min(0),
  price: numberType().min(0),
  discountPrice: numberType().min(0).optional()
});
const createProductFn_createServerFn_handler = createServerRpc({
  id: "a5c29c84fbd343628c2c568c19c228b70581bcd25a9caed2fb456a4af49f0794",
  name: "createProductFn",
  filename: "src/lib/server/products.ts"
}, (opts) => createProductFn.__executeServer(opts));
const createProductFn = createServerFn({
  method: "POST"
}).handler(createProductFn_createServerFn_handler, async (ctx) => {
  const data = productSchema.parse(ctx.data);
  await connectDB();
  const cloudinary = (await import("../_libs/cloudinary.mjs").then(function(n) {
    return n.c;
  })).v2;
  if (process.env.CLOUDINARY_URL) {
    cloudinary.config({
      secure: true
    });
  }
  const uploadedImages = [];
  for (const image of data.images) {
    if (image.startsWith("data:image")) {
      const uploadRes = await cloudinary.uploader.upload(image, {
        folder: "gadgethive/products"
      });
      uploadedImages.push(uploadRes.secure_url);
    } else {
      uploadedImages.push(image);
    }
  }
  const productData = {
    ...data,
    images: uploadedImages
  };
  const newProduct = new Product(productData);
  await newProduct.save();
  return JSON.parse(JSON.stringify(newProduct));
});
const getProducts_createServerFn_handler = createServerRpc({
  id: "86df8d8865db56cb8a30c01e847f90462d9497a37b0514201e4d945b4d3c3f61",
  name: "getProducts",
  filename: "src/lib/server/products.ts"
}, (opts) => getProducts.__executeServer(opts));
const getProducts = createServerFn({
  method: "GET"
}).handler(getProducts_createServerFn_handler, async () => {
  await connectDB();
  const products = await Product.find({}).populate("category", "name").sort({
    createdAt: -1
  }).lean();
  return JSON.parse(JSON.stringify(products));
});
const getProductBySlug_createServerFn_handler = createServerRpc({
  id: "0323837a9679fd00874ec1023a01e53902ccf3781b6a4e1f6e34cf08070d730b",
  name: "getProductBySlug",
  filename: "src/lib/server/products.ts"
}, (opts) => getProductBySlug.__executeServer(opts));
const getProductBySlug = createServerFn({
  method: "GET"
}).handler(getProductBySlug_createServerFn_handler, async (ctx) => {
  const slug = ctx.data;
  await connectDB();
  const product = await Product.findOne({
    slug
  }).populate("category", "name").lean();
  if (!product) {
    throw new Error("Product not found");
  }
  return JSON.parse(JSON.stringify(product));
});
const deleteProductFn_createServerFn_handler = createServerRpc({
  id: "d225ca0352828e682118b8ecf0afc6e25943e5dd476323349cc52f827cf3ea43",
  name: "deleteProductFn",
  filename: "src/lib/server/products.ts"
}, (opts) => deleteProductFn.__executeServer(opts));
const deleteProductFn = createServerFn({
  method: "POST"
}).handler(deleteProductFn_createServerFn_handler, async (ctx) => {
  const id = ctx.data;
  await connectDB();
  await Product.findByIdAndDelete(id);
  return {
    success: true
  };
});
const toggleProductStatusFn_createServerFn_handler = createServerRpc({
  id: "ef6bde1a38f64a7eeed42f8d62c987d1b008788de1f493f734de01a20b0fab78",
  name: "toggleProductStatusFn",
  filename: "src/lib/server/products.ts"
}, (opts) => toggleProductStatusFn.__executeServer(opts));
const toggleProductStatusFn = createServerFn({
  method: "POST"
}).handler(toggleProductStatusFn_createServerFn_handler, async (ctx) => {
  const {
    id,
    isActive
  } = ctx.data;
  await connectDB();
  const updated = await Product.findByIdAndUpdate(id, {
    isActive
  }, {
    new: true
  });
  return JSON.parse(JSON.stringify(updated));
});
export {
  createProductFn_createServerFn_handler,
  deleteProductFn_createServerFn_handler,
  getProductBySlug_createServerFn_handler,
  getProducts_createServerFn_handler,
  toggleProductStatusFn_createServerFn_handler
};
