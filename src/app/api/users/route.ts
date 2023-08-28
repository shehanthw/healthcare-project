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
    const res = await Users.create(validatedData);
    return NextResponse.json(
      { message: `user : ${validatedData.username} created` },
      { status: 200 }
    );
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
    const id = queryParams.get("_id");
    let response;

    if (username && role) {
      response = await Users.find({ username, role });

      if (response.length === 0) {
        return NextResponse.json({
          users: response,
          message: "no users found",
        });
      } else {
        return NextResponse.json({
          users: response,
        });
      }

      console.log();
    } else if (username) {
      // Filter by username
      response = await Users.find({ username });
      if (response.length === 0) {
        return NextResponse.json({
          users: response,
          message: "no users found",
        });
      } else {
        return NextResponse.json({
          users: response,
        });
      }
    } else if (role) {
      // Filter by role
      response = await Users.find({ role });
      if (response.length === 0) {
        return NextResponse.json({
          users: response,
          message: "no users found",
        });
      } else {
        return NextResponse.json({
          users: response,
        });
      }
    } else if (id) {
      // Filter by id
      response = await Users.findById(id);
      if (response.length === 0) {
        return NextResponse.json({
          users: response,
          message: "no users found",
        });
      } else {
        return NextResponse.json({
          users: response,
        });
      }
    } else {
      // No filters, get all users
      response = await Users.find();
      if (response.length === 0) {
        return NextResponse.json({
          users: response,
          message: "no users found",
        });
      } else {
        return NextResponse.json({
          users: response,
        });
      }
    }
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
