import { z } from "zod";

export const workTypeSchema = z.enum([
  "documentation",
  "bug",
  "public-api",
  "unknown",
]);
export const riskSchema = z.enum(["low", "medium", "high"]);
export const laneSchema = z.enum([
  "documentation",
  "bug",
  "public-api",
  "manual",
]);

export const evidenceSchema = z.object({
  details: z.string().optional(),
  kind: z.enum(["observation", "command", "test", "decision", "diff"]),
  recordedAt: z.iso.datetime(),
  summary: z.string().min(1),
});

export const workOrderSchema = z.object({
  classification: z
    .object({
      actionable: z.boolean(),
      confidence: z.number().min(0).max(1),
      questions: z.array(z.string()),
      rationale: z.string(),
      risk: riskSchema,
      type: workTypeSchema,
    })
    .optional(),
  evidence: z.array(evidenceSchema).default([]),
  id: z.string().min(1),
  route: z
    .object({
      approvalRequired: z.boolean(),
      lane: laneSchema,
      reason: z.string(),
    })
    .optional(),
  source: z.object({
    body: z.string(),
    number: z.number().int().positive(),
    title: z.string().min(1),
    url: z.url(),
  }),
  status: z.enum([
    "received",
    "needs-clarification",
    "routed",
    "investigating",
    "awaiting-approval",
    "building",
    "verifying",
    "ready-for-draft-pr",
    "stopped",
  ]),
});

export type Evidence = z.infer<typeof evidenceSchema>;
export type WorkOrder = z.infer<typeof workOrderSchema>;

export type WorkRoute = NonNullable<WorkOrder["route"]>;

export function addEvidence(
  workOrder: WorkOrder,
  evidence: Omit<Evidence, "recordedAt">,
) {
  return workOrderSchema.parse({
    ...workOrder,
    evidence: [
      ...workOrder.evidence,
      { ...evidence, recordedAt: new Date().toISOString() },
    ],
  });
}
