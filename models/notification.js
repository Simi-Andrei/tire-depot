import { Schema, model, models } from "mongoose";

const notificationSchema = new Schema(
  {
    correspEntry: { type: Schema.Types.ObjectId, ref: "Entry", required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Notification =
  models.Notification || model("Notification", notificationSchema);

export default Notification;
