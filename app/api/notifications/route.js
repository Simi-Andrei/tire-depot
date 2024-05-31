import connectDB from "@/lib/database";
import Notification from "@/models/notification";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  try {
    connectDB();

    const notifications = await Notification.find({});

    return NextResponse.json({ notifications }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch the notifications from the database!" },
      { status: 500 }
    );
  }
};
