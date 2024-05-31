import connectDB from "@/lib/database";
import User from "@/models/user";
import { NextResponse } from "next/server";

export const DELETE = async (req, { params }) => {
  try {
    const { id } = params;

    await connectDB();

    const user = await User.findById(id);

    await user.deleteOne();

    return NextResponse.json(
      { message: "User deleted successfully!" },
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
