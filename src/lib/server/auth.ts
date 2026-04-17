import { createServerFn } from "@tanstack/react-start";
import { connectDB } from "../db";
import { User } from "../models/User";


export const registerUserFn = createServerFn({ method: "POST" })
  .handler(async (ctx: { data: any }) => {
    try {
      const { name, email, password } = ctx.data as any;
      if (!email || !password) throw new Error("Missing required fields");

      await connectDB();
      
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return { success: false, error: "User with this email already exists" };
      }

      const bcrypt = await import("bcryptjs");
      // Hash the password using bcryptjs
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        isVerified: true, // Auto verified
      });

      await newUser.save();

      // Don't return password
      const userObject = newUser.toObject();
      delete userObject.password;

      // Fix serialization issue (ObjectId)
      const safeUser = JSON.parse(JSON.stringify(userObject));

      return { success: true, user: safeUser };
    } catch (err: any) {
      console.error("Registration Error:", err);
      return { success: false, error: err.message || "Registration failed" };
    }
  });

export const loginUserFn = createServerFn({ method: "POST" })
  .handler(async (ctx: { data: any }) => {
    try {
      const { email, password } = ctx.data as any;
      if (!email || !password) return { success: false, error: "Missing required fields" };

      await connectDB();
      
      const user = await User.findOne({ email });
      if (!user) {
        return { success: false, error: "Invalid email or password" };
      }

      const bcrypt = await import("bcryptjs");
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return { success: false, error: "Invalid email or password" };
      }

      const userObject = user.toObject();
      delete userObject.password;

      // Fix serialization issue (ObjectId)
      const safeUser = JSON.parse(JSON.stringify(userObject));

      return { success: true, user: safeUser };
    } catch (err: any) {
      console.error("Login Error:", err);
      return { success: false, error: err.message || "Login failed" };
    }
  });
