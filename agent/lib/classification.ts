import { z } from "zod";
import { riskSchema, workTypeSchema } from "./work-order.js";

export const classificationSchema = z.object({
  actionable: z.boolean(),
  confidence: z.number().min(0).max(1),
  questions: z.array(z.string().min(1)),
  rationale: z.string().min(1),
  risk: riskSchema,
  type: workTypeSchema,
});

export type Classification = z.infer<typeof classificationSchema>;
