import mongoose, { Schema, models } from "mongoose";

const visitSchema = new Schema({
  date: { type: String, required: true }, // e.g. "2025-11-08"
  count: { type: Number, default: 0 },
});

export const Visit = models.Visit || mongoose.model("Visit", visitSchema);
