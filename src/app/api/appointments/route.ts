import connectMongoDb from "@/server/config/mongodb";
import Appointments from "@/server/models/appointments";
import { NextRequest, NextResponse } from "next/server";
import { appointmentSchema } from "@/server/validation/AppointmentsValidation";
import { z } from "zod";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const validatedData = appointmentSchema.parse(data);

    await connectMongoDb();
    const res = await Appointments.create(validatedData);
    return NextResponse.json(
      { message: `patient : ${validatedData.ptName} created` },
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
    const ptName = queryParams.get("ptName");
    const id = queryParams.get("_id");
    const status = queryParams.get("status");
    let response;

    if (ptName) {
      response = await Appointments.find({ ptName });

      if (response.length === 0) {
        return NextResponse.json({
          appointments: response,
          message: "no appointments found",
        });
      } else {
        return NextResponse.json({
          appointments: response,
        });
      }
    } else if (status) {
      // Filter by id
      response = await Appointments.find({ status });
      if (response.length === 0) {
        return NextResponse.json({
          appointments: response,
          message: "no appointments found",
        });
      } else {
        return NextResponse.json({
          appointments: response,
        });
      }
    } else if (id) {
      // Filter by id
      response = await Appointments.findById(id);
      if (response.length === 0) {
        return NextResponse.json({
          appointments: response,
          message: "no appointments found",
        });
      } else {
        return NextResponse.json({
          appointments: response,
        });
      }
    } else {
      // No filters, get all appointments
      response = await Appointments.find();
      if (response.length === 0) {
        return NextResponse.json({
          appointments: response,
          message: "no appointments found",
        });
      } else {
        return NextResponse.json({
          appointments: response,
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
    await Appointments.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "Appointment deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    const data = await request.json();
    const validatedData = appointmentSchema.parse(data);

    await connectMongoDb();
    const response = await Appointments.findByIdAndUpdate(id, validatedData);

    const allMedicsDispensed = response.medics.every(
      (medic: any) => medic.drugStatus === "dispensed"
    );

    // Update the status based on the condition
    if (allMedicsDispensed) {
      response.status = "close";
    } else {
      response.status = "pending"; // Set it to another default value if needed
    }

    // Save the updated document
    const updatedResponse = await response.save();
    return NextResponse.json(
      { drugs: updatedResponse, message: "apoointment updated" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
