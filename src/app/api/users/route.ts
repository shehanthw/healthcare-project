import connectMongoDb from "@/server/config/mongodb";
import Users from "@/server/models/users";
import { NextRequest, NextResponse } from "next/server";
import { userSchema } from "@/server/validation/UserValidation";
import { z } from "zod";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const validatedData = userSchema.parse(data);

    await connectMongoDb();
    await Users.create(validatedData);
    return NextResponse.json({ message: "User created" }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      );
    } else {
      console.error("An error occurred:", error);
      return NextResponse.json(
        { error: "An error occurred while creating the user" },
        { status: 500 }
      );
    }
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectMongoDb();
    const queryParams = request.nextUrl.searchParams;
    const username = queryParams.get("username");
    const role = queryParams.get("role");
    let response;

    if (username && role) {
      // Filter by both username and role
      response = await Users.find({ username, role });
    } else if (username) {
      // Filter by username
      response = await Users.find({ username });
    } else if (role) {
      // Filter by role
      response = await Users.find({ role });
    } else {
      // No filters, get all users
      response = await Users.find();
    }

    return NextResponse.json({ users: response });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDb();
    await Users.findByIdAndDelete(id);
    return NextResponse.json({ message: "User deleted" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    const data = await request.json();
    const validatedData = userSchema.parse(data);

    await connectMongoDb();
    const response = await Users.findByIdAndUpdate(id, validatedData);
    return NextResponse.json({ Users: response }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
