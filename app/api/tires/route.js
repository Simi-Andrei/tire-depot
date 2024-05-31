import connectDB from "@/lib/database";
import Tire from "@/models/tire";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  try {
    await connectDB();

    const tires = await Tire.find({});

    return NextResponse.json({ tires }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch the tires from the database!" },
      { status: 500 }
    );
  }
};

export const POST = async (req, res) => {
  try {
    const { values } = await req.json();

    connectDB();

    const newTire = await Tire.create({
      brand: values.brand,
      width: values.width,
      height: values.height,
      diameter: values.diameter,
    });

    await newTire.save();

    return NextResponse.json(
      { message: "New tire successfully created!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add tire to database!" },
      { status: 400 }
    );
  }
};
