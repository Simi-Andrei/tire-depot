import connectDB from "@/lib/database";
import Customer from "@/models/customer";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  try {
    await connectDB();

    const customers = await Customer.find({});

    return NextResponse.json({ customers }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch the customers from the database!" },
      { status: 500 }
    );
  }
};

export const POST = async (req, res) => {
  try {
    const { values } = await req.json();

    connectDB();

    const newCustomer = await Customer.create({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
    });

    await newCustomer.save();

    return NextResponse.json(
      { message: "New customer successfully created!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add customer to database!" },
      { status: 400 }
    );
  }
};
