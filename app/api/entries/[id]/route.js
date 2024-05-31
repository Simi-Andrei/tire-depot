import connectDB from "@/lib/database";
import Entry from "@/models/entry";
import Tire from "@/models/tire";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { id } = params;

  try {
    connectDB();

    await Tire;

    const entry = await Entry.findById(id).populate("storedTires");

    return NextResponse.json({ entry }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch the entry from the database!" },
      { status: 500 }
    );
  }
};

export const DELETE = async (req, { params }) => {
  try {
    const { id } = params;

    await connectDB();

    const entry = await Entry.findById(id);

    await entry.deleteOne();

    return NextResponse.json(
      { message: "Entry deleted successfully!" },
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
