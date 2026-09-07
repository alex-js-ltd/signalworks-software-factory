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
