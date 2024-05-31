import { Schema, model, models } from "mongoose";

const entrySchema = new Schema(
  {
    customerFirstname: {
      type: String,
      required: true,
    },
    customerLastname: {
      type: String,
      required: true,
    },
    storedTires: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tire",
      },
    ],
    mountedTires: [
      {
        brand: {
          type: String,
          required: true,
        },
        model: {
          type: String,
          required: true,
        },
      },
    ],
    periodInMonths: { type: Number, required: true },
    expired: { type: Boolean, default: false },
    rims: { type: Boolean, default: false, required: true },
    pricePerMonth: { type: Number, required: true },
    price: { type: Number, required: true },
    correspEstimate: { type: Schema.Types.ObjectId, ref: "Estimate" },
  },
  { timestamps: true }
);

const Entry = models.Entry || model("Entry", entrySchema);

export default Entry;
