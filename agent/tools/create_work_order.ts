import { defineTool } from "eve/tools";
import { z } from "zod";
import { workOrderSchema } from "../lib/work-order.js";

export default defineTool({
  description: "Create the typed work order for one GitHub issue.",
  execute(input) {
    return workOrderSchema.parse({
      evidence: [],
      id: `issue-${input.number}`,
      source: input,
      status: "received",
    });
  },
  inputSchema: z.object({
    body: z.string(),
    number: z.number().int().positive(),
    title: z.string().min(1),
    url: z.url(),
  }),
});
