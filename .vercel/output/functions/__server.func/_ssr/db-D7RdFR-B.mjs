import { T as TSS_SERVER_FUNCTION } from "./index.mjs";
import { m as mongoose } from "../_libs/mongoose.mjs";
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://test:714r9IiM67WFHCJe@cluster0.afwrd.mongodb.net/?appName=Cluster0";
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}
async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false
    };
    cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose2) => {
      console.log("Successfully connected to MongoDB");
      return mongoose2;
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
  return cached.conn;
}
export {
  connectDB as a,
  createServerRpc as c
};
