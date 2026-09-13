import { type Classification } from "./classification.js";
import { type WorkRoute } from "./work-order.js";

export function routeClassification(classification: Classification): WorkRoute {
  if (!classification.actionable || classification.type === "unknown") {
    return {
      approvalRequired: true,
      lane: "manual",
      reason: "The request needs clarification before the factory can act.",
    };
  }

  if (classification.type === "public-api") {
    return {
      approvalRequired: true,
      lane: "public-api",
      reason: "Exported API changes require an approved specification.",
    };
  }

  const reason =
    classification.type === "bug"
      ? "Bugs must be reproduced before implementation."
      : "Documentation changes follow the prose lane.";

  if (classification.risk === "high") {
    return {
      approvalRequired: true,
      lane: classification.type,
      reason: `${reason} High risk requires approval.`,
    };
  }

  return {
    approvalRequired: false,
    lane: classification.type,
    reason: `${reason} Low or medium risk does not require approval.`,
  };
}
