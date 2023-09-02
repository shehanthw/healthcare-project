import mongoose, { Schema } from "mongoose";

const drugSchema = new Schema(
  {
    drugName: String,
    mfgDate: Date,
    expDate: Date,
    quantity: Number,
  },
  { timestamps: true }
);

const Drugs = mongoose.models.Drug || mongoose.model("Drug", drugSchema);
export default Drugs;
