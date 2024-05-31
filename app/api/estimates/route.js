import connectDB from "@/lib/database";
import Estimate from "@/models/estimate";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  try {
    await connectDB();

    const estimates = await Estimate.find({});

    return NextResponse.json({ estimates }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch the estimates from the database",
      },
      { status: 500 }
    );
  }
};

export const POST = async (req, res) => {
  try {
    const { formData } = await req.json();

    await connectDB();

    const newEstimate = await Estimate.create({
      customerFirstname: formData.customerFirstname,
      customerLastname: formData.customerLastname,
      tires: formData.selectedTires,
      periodInMonths: formData.periodInMonths,
      rims: formData.rims,
      pricePerMonth: formData.pricePerMonth,
      price: formData.pricePerMonth * Number(formData.periodInMonths),
    });

    await newEstimate.save();

    return NextResponse.json(
      { message: "New estimate successfully created" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add estimate to database!" },
      { status: 400 }
    );
  }
};
