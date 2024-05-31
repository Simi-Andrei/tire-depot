import connectDB from "@/lib/database";
import Estimate from "@/models/estimate";
import Tire from "@/models/tire";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    const { id } = params;

    await connectDB();

    await Tire;

    const estimate = await Estimate.findById(id).populate("tires");

    return NextResponse.json({ estimate }, { status: 200 });
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

    const estimate = await Estimate.findById(id);

    await estimate.deleteOne();

    return NextResponse.json(
      { message: "Estimate deleted successfully!" },
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
