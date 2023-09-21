import mongoose, { Schema } from "mongoose";

const appointmentsSchema = new Schema(
  {
    ptName: String,
    ptAge: Number,
    contact: String,
    medics: [
      {
        drugName: String,
        amount: Number,
        drugStatus: {
          type: String,
          default: "Pending",
        },
      },
    ],
    status: {
      type: String,
      default: "pending",
    },
    description: String,
  },
  { timestamps: true }
);

const Apponitments =
  mongoose.models.Appointment ||
  mongoose.model("Appointment", appointmentsSchema);
export default Apponitments;
