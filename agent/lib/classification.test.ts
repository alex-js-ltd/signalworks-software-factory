import { describe, expect, it } from "vitest";
import { classificationSchema } from "./classification.js";

describe("classificationSchema", () => {
  it("rejects unclear work without a focused question", () => {
    const result = classificationSchema.safeParse({
      actionable: false,
      confidence: 0.4,
      questions: [],
      rationale: "The requested documentation outcome is missing.",
      risk: "low",
      type: "documentation",
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues).toEqual([
      expect.objectContaining({ code: "custom", path: ["questions"] }),
    ]);
  });

  it("rejects actionable work with clarification questions", () => {
    const result = classificationSchema.safeParse({
      actionable: true,
      confidence: 0.9,
      questions: ["Which retry behavior should the README describe?"],
      rationale: "The request specifies a prose-only correction.",
      risk: "low",
      type: "documentation",
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues).toEqual([
      expect.objectContaining({ code: "custom", path: ["questions"] }),
    ]);
  });
});
