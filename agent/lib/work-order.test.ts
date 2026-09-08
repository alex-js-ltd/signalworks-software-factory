import { describe, expect, it } from "vitest";
import { workOrderSchema } from "./work-order.js";

function generateWorkOrder(status: string = "received") {
  return {
    id: "wo-001",
    source: {
      body: "Calling `render()` twice throws a TypeError.",
      number: 412,
      title: "render() crashes on second call",
      url: "https://github.com/acme/eve/issues/412",
    },
    status,
  };
}

describe("workOrderSchema", () => {
  it("accepts a new work order and defaults evidence to an empty array", () => {
    const workOrder = generateWorkOrder();

    const result = workOrderSchema.safeParse(workOrder);

    expect(result.success).toBe(true);
  });

  it("accepts an observation in the evidence log", () => {
    const observation = {
      kind: "observation",
      summary: "Reproduced the issue locally.",
      recordedAt: "2026-09-08T10:00:00.000Z",
    };
    const workOrderWithObservation = {
      ...generateWorkOrder(),
      evidence: [observation],
    };

    const result = workOrderSchema.safeParse(workOrderWithObservation);

    expect(result.success).toBe(true);
  });

  it("try to create a work order with status: looks-good-to-me. Zod should reject any state outside the defined workflow.", () => {
    const workOrder = generateWorkOrder("looks-good-to-me");

    const result = workOrderSchema.safeParse(workOrder);

    expect(result.success).toBe(false);
  });
});
