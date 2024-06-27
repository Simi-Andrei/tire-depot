import connectDB from "@/lib/database";
import User from "@/models/user";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    const { id } = params;

    await connectDB();

    const user = await User.findById(id);

    return NextResponse.json({ user }, { status: 200 });
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

    const editedUser = await User.findById(id);

    editedUser.username = values.username;
    editedUser.email = values.email;
    editedUser.phoneNumber = values.phoneNumber;
    editedUser.role = values.role;

    editedUser.save();

    return NextResponse.json(
      { editedUser },
      { message: "User edited successfully!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to edit the user!",
      },
      { status: 500 }
    );
  }
};

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
