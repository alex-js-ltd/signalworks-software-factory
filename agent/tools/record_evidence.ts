import { defineTool } from "eve/tools";
import { z } from "zod";
import {
  addEvidence,
  evidenceSchema,
  workOrderSchema,
} from "../lib/work-order.js";

export default defineTool({
  description: "Append evidence to a work order.",
  inputSchema: z.object({
    workOrder: workOrderSchema,
    evidence: evidenceSchema.omit({ recordedAt: true }),
  }),
  execute({ workOrder, evidence }) {
    return addEvidence(workOrder, evidence);
  },
});
