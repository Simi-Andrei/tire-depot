import { Schema, model, models } from "mongoose";

const tireSchema = new Schema(
  {
    brand: { type: String, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    diameter: { type: Number, required: true },
  },
  { timestamps: true }
);

const Tire = models.Tire || model("Tire", tireSchema);

export default Tire;
