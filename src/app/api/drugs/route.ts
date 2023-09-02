import connectMongoDb from "@/server/config/mongodb";
import Drugs from "@/server/models/drugs";
import { NextRequest, NextResponse } from "next/server";
import { drugSchema } from "@/server/validation/DrugValidation";
import { z } from "zod";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const validatedData = drugSchema.parse(data);

    await connectMongoDb();
    const res = await Drugs.create(validatedData);
    return NextResponse.json(
      { message: `drug : ${validatedData.drugName} created` },
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
    const drugName = queryParams.get("drugName");
    const mfgDate = queryParams.get("mfgDate");
    const expDate = queryParams.get("expDate");
    const id = queryParams.get("_id");
    let response;

    if (drugName) {
      response = await Drugs.find({ drugName });

      if (response.length === 0) {
        return NextResponse.json({
          drugs: response,
          message: "no drugs found",
        });
      } else {
        return NextResponse.json({
          drugs: response,
        });
      }
    } else if (mfgDate) {
      // Filter by username
      response = await Drugs.find({ mfgDate });
      if (response.length === 0) {
        return NextResponse.json({
          drugs: response,
          message: "no drugs found",
        });
      } else {
        return NextResponse.json({
          drugs: response,
        });
      }
    } else if (expDate) {
      // Filter by role
      response = await Drugs.find({ expDate });
      if (response.length === 0) {
        return NextResponse.json({
          drugs: response,
          message: "no drugs found",
        });
      } else {
        return NextResponse.json({
          drugs: response,
        });
      }
    } else if (id) {
      // Filter by id
      response = await Drugs.findById(id);
      if (response.length === 0) {
        return NextResponse.json({
          drugs: response,
          message: "no drugs found",
        });
      } else {
        return NextResponse.json({
          drugs: response,
        });
      }
    } else {
      // No filters, get all Drugs
      response = await Drugs.find();
      if (response.length === 0) {
        return NextResponse.json({
          drugs: response,
          message: "no drugs found",
        });
      } else {
        return NextResponse.json({
          drugs: response,
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
    await Drugs.findByIdAndDelete(id);
    return NextResponse.json({ message: "Drug deleted" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    const data = await request.json();
    const validatedData = drugSchema.parse(data);

    await connectMongoDb();
    const response = await Drugs.findByIdAndUpdate(id, validatedData);
    return NextResponse.json(
      { drugs: response, message: "drug updated" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
