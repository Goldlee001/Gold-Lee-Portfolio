import mongoose, { Schema, models } from "mongoose";

const VisitSchema = new Schema(
  {
    ip: { type: String, required: true },
  },
  { timestamps: true }
);

const Visit = models.Visit || mongoose.model("Visit", VisitSchema);
export default Visit;
