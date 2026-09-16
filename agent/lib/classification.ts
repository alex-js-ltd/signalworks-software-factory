import { z } from "zod";
import { riskSchema, workTypeSchema } from "./work-order.js";

export const classificationSchema = z
  .object({
    actionable: z.boolean(),
    confidence: z.number().min(0).max(1),
    questions: z.array(z.string().min(1)),
    rationale: z.string().min(1),
    risk: riskSchema,
    type: workTypeSchema,
  })
  .superRefine((classification, ctx) => {
    if (!classification.actionable && classification.questions.length === 0) {
      ctx.addIssue({
        code: "custom",
        message: "Unclear work must include at least one focused question.",
        path: ["questions"],
      });
    }

    if (classification.actionable && classification.questions.length > 0) {
      ctx.addIssue({
        code: "custom",
        message: "Actionable work cannot include clarification questions.",
        path: ["questions"],
      });
    }
  });

export type Classification = z.infer<typeof classificationSchema>;
