import connectDB from "@/lib/database";
import Entry from "@/models/entry";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  try {
    connectDB();

    const entries = await Entry.find({});

    return NextResponse.json({ entries }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch the entries from the database!" },
      { status: 500 }
    );
  }
};

export const POST = async (req, res) => {
  try {
    const { values } = await req.json();

    connectDB();

    const newEntry = await Entry.create({
      correspEstimate: values.correspEstimate,
      customerFirstname: values.customerFirstname,
      customerLastname: values.customerLastname,
      storedTires: values.tires,
      periodInMonths: values.periodInMonths,
      rims: values.rims,
      pricePerMonth: values.pricePerMonth,
      price: values.pricePerMonth * Number(values.periodInMonths),
    });

    await newEntry.save();

    return NextResponse.json(
      { message: "New entry successfully created!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add entry to database!" },
      { status: 400 }
    );
  }
};
