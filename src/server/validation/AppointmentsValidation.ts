import { z } from "zod";

const appointmentSchema = z.object({
  ptName: z.string().min(1, "username is required"),
  ptAge: z.number(),
  contact: z.string(),
  medics: z.array(
    z.object({
      drugName: z.string(),
      amount: z.number(),
      drugStatus: z.string().optional(),
    })
  ),
  status: z.string().optional(),
  description: z.string(),
});

export { appointmentSchema };
