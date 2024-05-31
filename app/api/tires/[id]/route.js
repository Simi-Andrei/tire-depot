import connectDB from "@/lib/database";
import Tire from "@/models/tire";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    const { id } = params;

    await connectDB();

    const tire = await Tire.findById(id);

    return NextResponse.json({ tire }, { status: 200 });
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

    const tire = await Tire.findById(id);

    await tire.deleteOne();

    return NextResponse.json(
      { message: "Tire deleted successfully!" },
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

export const POST = async (req, { params }) => {
  try {
    const { id } = params;

    const { values } = await req.json();

    await connectDB();

    const tireToEdit = await Tire.findById(id);

    tireToEdit.brand = values.brand;
    tireToEdit.width = values.width;
    tireToEdit.height = values.height;
    tireToEdit.diameter = values.diameter;

    tireToEdit.save();

    return NextResponse.json(
      { message: "Tire edited successfully!" },
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
