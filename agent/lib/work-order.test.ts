import { describe, expect, test } from "vitest";
import { addEvidence, workOrderSchema } from "./work-order.js";

describe("work order", () => {
  test("creates a new work order", () => {
    const workOrder = workOrderSchema.parse({
      id: "issue-123",
      source: {
        body: "Something is broken",
        number: 123,
        title: "Fix the thing",
        url: "https://github.com/example/repo/issues/123",
      },
      status: "received",
    });

    expect(workOrder.id).toBe("issue-123");
    expect(workOrder.status).toBe("received");
    expect(workOrder.evidence).toEqual([]);
  });

  test("appends an observation", () => {
    const workOrder = workOrderSchema.parse({
      id: "issue-123",
      source: {
        body: "Something is broken",
        number: 123,
        title: "Fix the thing",
        url: "https://github.com/example/repo/issues/123",
      },
      status: "received",
    });

    const updated = addEvidence(workOrder, {
      kind: "observation",
      summary: "Reproduced the issue locally",
    });

    expect(updated.evidence).toHaveLength(1);

    expect(updated.evidence[0]).toMatchObject({
      kind: "observation",
      summary: "Reproduced the issue locally",
    });

    expect(updated.evidence[0]?.recordedAt).toBeDefined();
  });
});
