import type { GitHubIssueEvent } from "eve/channels/github";
import { z } from "zod";

const rawIssueSchema = z.object({
  body: z.string().nullable().optional(),
  html_url: z.url(),
  title: z.string().min(1),
});

export function normalizeIssue(issue: GitHubIssueEvent) {
  const raw = rawIssueSchema.parse(issue.raw);

  return {
    body: raw.body ?? "",
    number: issue.issueNumber,
    title: raw.title,
    url: raw.html_url,
  };
}
