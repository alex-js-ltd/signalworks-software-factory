import type { GitHubIssueEvent } from "eve/channels/github";
import { describe, expect, it } from "vitest";
import { ZodError } from "zod";
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

    expect(normalizeIssue(issue)).toStrictEqual({
      body: "Calling render() twice throws a TypeError.",
      number: 412,
      title: "render() crashes on second call",
      url: "https://github.com/acme/eve/issues/412",
    });
  });

  it("normalizes a null body to an empty string", () => {
    const issue: GitHubIssueEvent = {
      action: "labeled",
      issueNumber: 412,
      raw: {
        number: 999,
        body: null,
        title: "render() crashes on second call",
        html_url: "https://github.com/acme/eve/issues/412",
        labels: [{ name: "factory" }],
      },
    };

    expect(normalizeIssue(issue)).toStrictEqual({
      body: "",
      number: 412,
      title: "render() crashes on second call",
      url: "https://github.com/acme/eve/issues/412",
    });
  });

  it("normalizes a missing body to an empty string", () => {
    const issue: GitHubIssueEvent = {
      action: "labeled",
      issueNumber: 412,
      raw: {
        number: 999,
        title: "render() crashes on second call",
        html_url: "https://github.com/acme/eve/issues/412",
        labels: [{ name: "factory" }],
      },
    };

    expect(normalizeIssue(issue)).toStrictEqual({
      body: "",
      number: 412,
      title: "render() crashes on second call",
      url: "https://github.com/acme/eve/issues/412",
    });
  });

  it("rejects an issue whose html_url is not a valid URL", () => {
    const issue: GitHubIssueEvent = {
      action: "labeled",
      issueNumber: 412,
      raw: {
        number: 999,
        body: "Calling render() twice throws a TypeError.",
        title: "render() crashes on second call",
        html_url: "acme/eve#412",
        labels: [{ name: "factory" }],
      },
    };

    expect(() => normalizeIssue(issue)).toThrow(ZodError);
  });
});
