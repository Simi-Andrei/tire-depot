import connectDB from "@/lib/database";
import Customer from "@/models/customer";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    const { id } = params;

    await connectDB();

    const customer = await Customer.findById(id);

    return NextResponse.json({ customer }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
};

export const DELETE = async (req, { params }) => {
  try {
    const { id } = params;

    await connectDB();

    const customer = await Customer.findById(id);

    await customer.deleteOne();

    return NextResponse.json(
      { message: "Customer deleted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
};
