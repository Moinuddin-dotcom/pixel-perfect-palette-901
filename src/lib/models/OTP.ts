import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  code: { type: String, required: true },
  expiresAt: { type: Date, default: () => Date.now() + 10 * 60 * 1000 }, // Expires in 10 minutes
});

// Automatically delete expired documents
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const OTP = mongoose.models.OTP || mongoose.model("OTP", otpSchema);
