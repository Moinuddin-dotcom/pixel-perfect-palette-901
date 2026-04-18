import { c as createServerRpc, a as connectDB } from "./db-D7RdFR-B.mjs";
import { m as mongoose } from "../_libs/mongoose.mjs";
import { c as createServerFn } from "./index.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
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
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  createdAt: { type: Date, default: Date.now }
});
const User = mongoose.models.User || mongoose.model("User", userSchema);
const registerUserFn_createServerFn_handler = createServerRpc({
  id: "ce6775224b1bc8ae38e13d2023b8489fd0119ee9096eb473464dc2dab7115a47",
  name: "registerUserFn",
  filename: "src/lib/server/auth.ts"
}, (opts) => registerUserFn.__executeServer(opts));
const registerUserFn = createServerFn({
  method: "POST"
}).handler(registerUserFn_createServerFn_handler, async (ctx) => {
  try {
    const {
      name,
      email,
      password
    } = ctx.data;
    if (!email || !password) throw new Error("Missing required fields");
    await connectDB();
    const existingUser = await User.findOne({
      email
    });
    if (existingUser) {
      return {
        success: false,
        error: "User with this email already exists"
      };
    }
    const bcrypt = await import("../_libs/bcryptjs.mjs");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      isVerified: true
      // Auto verified
    });
    await newUser.save();
    const userObject = newUser.toObject();
    delete userObject.password;
    const safeUser = JSON.parse(JSON.stringify(userObject));
    return {
      success: true,
      user: safeUser
    };
  } catch (err) {
    console.error("Registration Error:", err);
    return {
      success: false,
      error: err.message || "Registration failed"
    };
  }
});
const loginUserFn_createServerFn_handler = createServerRpc({
  id: "8d071efc9d54e34c7535b51e385fcb60a03cc21e4c6d4fbd3e8480833fc7e703",
  name: "loginUserFn",
  filename: "src/lib/server/auth.ts"
}, (opts) => loginUserFn.__executeServer(opts));
const loginUserFn = createServerFn({
  method: "POST"
}).handler(loginUserFn_createServerFn_handler, async (ctx) => {
  try {
    const {
      email,
      password
    } = ctx.data;
    if (!email || !password) return {
      success: false,
      error: "Missing required fields"
    };
    await connectDB();
    const user = await User.findOne({
      email
    });
    if (!user) {
      return {
        success: false,
        error: "Invalid email or password"
      };
    }
    const bcrypt = await import("../_libs/bcryptjs.mjs");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return {
        success: false,
        error: "Invalid email or password"
      };
    }
    const userObject = user.toObject();
    delete userObject.password;
    const safeUser = JSON.parse(JSON.stringify(userObject));
    return {
      success: true,
      user: safeUser
    };
  } catch (err) {
    console.error("Login Error:", err);
    return {
      success: false,
      error: err.message || "Login failed"
    };
  }
});
export {
  loginUserFn_createServerFn_handler,
  registerUserFn_createServerFn_handler
};
