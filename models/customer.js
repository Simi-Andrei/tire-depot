import { Schema, model, models } from "mongoose";

const customerSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
  },
  { timestamps: true }
);

const Customer = models.Customer || model("Customer", customerSchema);

export default Customer;
