import mongoose, { Schema, models } from "mongoose";

const messageSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Message = models.Message || mongoose.model("Message", messageSchema);

export default Message;
