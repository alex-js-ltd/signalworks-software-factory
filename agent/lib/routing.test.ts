import { describe, expect, it } from "vitest";
import { routeClassification } from "./routing.js";

describe("routeClassification", () => {
  it("routes 'Webhook docs are confusing' to manual for clarification", () => {
    const route = routeClassification({
      actionable: false,
      confidence: 0.9,
      questions: ["Which webhook documentation is confusing?"],
      rationale: "The request does not identify a specific documentation change.",
      risk: "low",
      type: "documentation",
    });

    expect(route).toMatchObject({ lane: "manual", approvalRequired: true });
  });

  it("routes 'Uppercase channel names fail' to bug", () => {
    const route = routeClassification({
      actionable: true,
      confidence: 0.9,
      questions: [],
      rationale: "Existing channel handling fails for uppercase names.",
      risk: "medium",
      type: "bug",
    });

    expect(route).toMatchObject({ lane: "bug", approvalRequired: false });
    expect(route.reason).toContain("reproduced before implementation");
  });

  it("routes 'Add optional exported priority' to public-api with approval", () => {
    const route = routeClassification({
      actionable: true,
      confidence: 0.99,
      questions: [],
      rationale: "Adding an exported priority field changes the public contract.",
      risk: "high",
      type: "public-api",
    });

    expect(route).toMatchObject({ lane: "public-api", approvalRequired: true });
  });

  it("routes 'Fix one clear sentence in the README' to documentation", () => {
    const route = routeClassification({
      actionable: true,
      confidence: 0.95,
      questions: [],
      rationale: "The request specifies a prose-only correction.",
      risk: "low",
      type: "documentation",
    });

    expect(route).toMatchObject({
      lane: "documentation",
      approvalRequired: false,
    });
  });
});
