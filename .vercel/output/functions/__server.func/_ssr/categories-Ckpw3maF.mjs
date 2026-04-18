import { c as createServerRpc, a as connectDB } from "./db-D7RdFR-B.mjs";
import { m as mongoose } from "../_libs/mongoose.mjs";
import { c as createServerFn } from "./index.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
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
const categorySchema$1 = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  slug: { type: String, required: true, unique: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});
const Category = mongoose.models.Category || mongoose.model("Category", categorySchema$1);
const getCategories_createServerFn_handler = createServerRpc({
  id: "a1b273f801141b23a4f9e95ea787cd34402cb473115f68ced6058f287e3b84f3",
  name: "getCategories",
  filename: "src/lib/server/categories.ts"
}, (opts) => getCategories.__executeServer(opts));
const getCategories = createServerFn({
  method: "GET"
}).handler(getCategories_createServerFn_handler, async () => {
  await connectDB();
  const categories = await Category.find({}).sort({
    createdAt: -1
  }).lean();
  return JSON.parse(JSON.stringify(categories));
});
const categorySchema = objectType({
  name: stringType().min(2),
  description: stringType().optional(),
  slug: stringType().min(2)
});
const createCategoryFn_createServerFn_handler = createServerRpc({
  id: "034604d2cba38e8350b43cb1f09142844bf6b224615701c86c4fb3ee1ff4d201",
  name: "createCategoryFn",
  filename: "src/lib/server/categories.ts"
}, (opts) => createCategoryFn.__executeServer(opts));
const createCategoryFn = createServerFn({
  method: "POST"
}).handler(createCategoryFn_createServerFn_handler, async (ctx) => {
  const data = categorySchema.parse(ctx.data);
  await connectDB();
  const newCategory = new Category(data);
  await newCategory.save();
  return JSON.parse(JSON.stringify(newCategory));
});
const deleteCategoryFn_createServerFn_handler = createServerRpc({
  id: "d893fb04f8ff3fa87933a5bc9f6607e53e5620ce1eee54b5fdca3b7cb2511c9d",
  name: "deleteCategoryFn",
  filename: "src/lib/server/categories.ts"
}, (opts) => deleteCategoryFn.__executeServer(opts));
const deleteCategoryFn = createServerFn({
  method: "POST"
}).handler(deleteCategoryFn_createServerFn_handler, async (ctx) => {
  const id = ctx.data;
  await connectDB();
  await Category.findByIdAndDelete(id);
  return {
    success: true
  };
});
const toggleCategoryStatusFn_createServerFn_handler = createServerRpc({
  id: "48b692843f90bba770e66123403dd4d5f2f7449fca1a934c9bcd6fc6d3f1a1f1",
  name: "toggleCategoryStatusFn",
  filename: "src/lib/server/categories.ts"
}, (opts) => toggleCategoryStatusFn.__executeServer(opts));
const toggleCategoryStatusFn = createServerFn({
  method: "POST"
}).handler(toggleCategoryStatusFn_createServerFn_handler, async (ctx) => {
  const {
    id,
    isActive
  } = ctx.data;
  await connectDB();
  const updated = await Category.findByIdAndUpdate(id, {
    isActive
  }, {
    new: true
  });
  return JSON.parse(JSON.stringify(updated));
});
export {
  createCategoryFn_createServerFn_handler,
  deleteCategoryFn_createServerFn_handler,
  getCategories_createServerFn_handler,
  toggleCategoryStatusFn_createServerFn_handler
};
