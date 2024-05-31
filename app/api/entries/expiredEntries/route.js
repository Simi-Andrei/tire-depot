import connectDB from "@/lib/database";
import Entry from "@/models/entry";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  try {
    connectDB();

    const expiredEntries = await Entry.find({ expired: true });

    return NextResponse.json({ expiredEntries }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch the expired entries from the database!" },
      { status: 500 }
    );
  }
};
