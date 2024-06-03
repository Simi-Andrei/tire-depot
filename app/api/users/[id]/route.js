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

    const userToEdit = await User.findById(id);

    userToEdit.name = values.name;
    userToEdit.email = values.email;
    userToEdit.isAdmin = values.isAdmin;

    userToEdit.save();

    return NextResponse.json(
      { message: "User edited successfully!" },
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
