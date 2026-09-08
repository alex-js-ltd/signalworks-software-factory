import { describe, expect, it } from "vitest";
import {
  workOrderSchema,
  evidenceSchema,
  addEvidence,
  type WorkOrder,
} from "./work-order.js";

function generateWorkOrder(): WorkOrder {
  return {
    id: "wo-001",
    source: {
      body: "Calling `render()` twice throws a TypeError.",
      number: 412,
      title: "render() crashes on second call",
      url: "https://github.com/acme/eve/issues/412",
    },
    status: "received",
    evidence: [],
  };
}

describe("workOrderSchema", () => {
  it("accepts a new work order and defaults evidence to an empty array", () => {
    const workOrder = generateWorkOrder();

    const result = workOrderSchema.parse(workOrder);

    expect(result.evidence).toEqual([]);
  });

  it("rejects a status outside the defined workflow", () => {
    const workOrder = generateWorkOrder();

    const result = workOrderSchema.safeParse({
      ...workOrder,
      status: "looks-good-to-me",
    });

    expect(result.success).toBe(false);
  });

  it("requires recordedAt to be an ISO datetime", () => {
    const result = evidenceSchema.safeParse({
      kind: "observation",
      recordedAt: "2026-09-08",
      summary: "Reproduced the crash",
    });

    expect(result.success).toBe(false);
  });

  it("appends an observation and generates its timestamp", () => {
    const workOrder = generateWorkOrder();

    const result = addEvidence(workOrder, {
      kind: "observation",
      summary: "Reproduced the issue locally.",
    });

    expect(result.evidence).toEqual([
      {
        kind: "observation",
        summary: "Reproduced the issue locally.",
        recordedAt: expect.any(String),
      },
    ]);
  });
});
