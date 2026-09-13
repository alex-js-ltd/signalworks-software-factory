import { defineTool } from "eve/tools";
import { classificationSchema } from "../lib/classification.js";
import { routeClassification } from "../lib/routing.js";

export default defineTool({
  description:
    "Route a classification and determine whether approval is required.",
  inputSchema: classificationSchema,
  execute(input) {
    return routeClassification(input);
  },
});
