import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://test:714r9IiM67WFHCJe@cluster0.afwrd.mongodb.net/?appName=Cluster0";

if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable inside .env");
}

declare global {
  var mongoose: {
    conn: any;
    promise: any;
  };
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => {
      console.log("Successfully connected to MongoDB");
      return mongoose;
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
