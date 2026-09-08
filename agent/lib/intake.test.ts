import type { GitHubIssueEvent } from "eve/channels/github";
import { describe, expect, it } from "vitest";
import { normalizeIssue } from "./intake.js";

describe("normalizeIssue", () => {
  it("normalizes a labeled issue using the issue number supplied by eve", () => {
    const issue: GitHubIssueEvent = {
      action: "labeled",
      issueNumber: 412,
      raw: {
        number: 999,
        body: "Calling render() twice throws a TypeError.",
        title: "render() crashes on second call",
        html_url: "https://github.com/acme/eve/issues/412",
        labels: [{ name: "factory" }],
      },
    };

    expect(normalizeIssue(issue)).toEqual({
      body: "Calling render() twice throws a TypeError.",
      number: 412,
      title: "render() crashes on second call",
      url: "https://github.com/acme/eve/issues/412",
    });
  });
});
