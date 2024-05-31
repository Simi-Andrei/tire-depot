import connectDB from "@/lib/database";
import Notification from "@/models/notification";
import { NextResponse } from "next/server";

export const PUT = async (req, { params }) => {
  try {
    const { id } = params;

    connectDB();

    const notificationToMarkAsRead = await Notification.findByIdAndUpdate(id, {
      read: true,
    });

    return NextResponse.json({ notificationToMarkAsRead }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to edit the notification in the database!" },
      { status: 500 }
    );
  }
};
