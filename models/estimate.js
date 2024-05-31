import { Schema, model, models } from "mongoose";

const estimateSchema = new Schema(
  {
    customerFirstname: { type: String, required: true },
    customerLastname: { type: String, required: true },
    tires: [{ type: Schema.Types.ObjectId, ref: "Tire" }],
    periodInMonths: { type: Number, required: true },
    rims: { type: Boolean, required: true },
    pricePerMonth: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

const Estimate = models.Estimate || model("Estimate", estimateSchema);

export default Estimate;
