import connectDB from "@/lib/database";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const GET = async (req, res) => {
  try {
    await connectDB();

    const users = await User.find({});

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch the users from the database!" },
      { status: 500 }
    );
  }
};

export const POST = async (req, res) => {
  try {
    const { values } = await req.json();

    await connectDB();

    const hashedPassword = bcrypt.hashSync(values.password, 10);

    const newUser = await User.create({
      username: values.username,
      email: values.email,
      phoneNumber: values.phoneNumber,
      password: hashedPassword,
      role: values.role,
    });

    await newUser.save();

    console.log(values);

    return NextResponse.json(
      { message: "New user successfully created!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add user to database!" },
      { status: 400 }
    );
  }
};
