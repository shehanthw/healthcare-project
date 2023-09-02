import { z } from "zod";

const drugSchema = z.object({
  drugName: z.string().min(1, "username is required"),
  mfgDate: z.string(),
  expDate: z.string(),
  quantity: z.number(),
});

export { drugSchema };
