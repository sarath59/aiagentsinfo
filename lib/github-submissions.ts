import { neutralizeMentions, submissionIssueBody, type ToolSubmission } from "@/lib/submissions";

export const SUBMISSION_LABEL = "tool-submission";

const DEFAULT_REPO = "sarath59/aiagentsinfo";

export function submissionsToken() {
  const token = process.env.GITHUB_SUBMISSIONS_TOKEN?.trim();
  return token || null;
}

export function submissionsRepo() {
  const repo = process.env.GITHUB_SUBMISSIONS_REPO?.trim() || DEFAULT_REPO;
  if (!/^[\w.-]+\/[\w.-]+$/.test(repo)) {
    throw new Error("GITHUB_SUBMISSIONS_REPO must look like owner/name.");
  }
  return repo;
}

export type FileSubmissionResult =
  | { ok: true }
  | { ok: false; reason: "duplicate" | "github"; status: number };

export async function fileToolSubmission(submission: ToolSubmission): Promise<FileSubmissionResult> {
  const token = submissionsToken();
  if (!token) return { ok: false, reason: "github", status: 503 };
  const repo = submissionsRepo();
  const labeled = await ensureLabel(token, repo);
  const duplicate = await hasRecentSubmission(token, repo, submission, labeled);
  if (duplicate) return { ok: false, reason: "duplicate", status: 429 };
  return createIssue(token, repo, submission, labeled);
}

function ghHeaders(token: string) {
  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    "User-Agent": "aiagentsinfo-submissions",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

async function ensureLabel(token: string, repo: string) {
  const existing = await gh(token, `https://api.github.com/repos/${repo}/labels/${encodeURIComponent(SUBMISSION_LABEL)}`);
  if (existing?.ok) return true;
  if (existing && existing.status !== 404) return false;
  const created = await gh(token, `https://api.github.com/repos/${repo}/labels`, {
    method: "POST",
    body: JSON.stringify({
      name: SUBMISSION_LABEL,
      color: "0C5CAD",
      description: "Public directory submissions waiting for a fact-check",
    }),
  });
  return Boolean(created && (created.ok || created.status === 422));
}

async function hasRecentSubmission(
  token: string,
  repo: string,
  submission: ToolSubmission,
  labeled: boolean,
) {
  const url = new URL(`https://api.github.com/repos/${repo}/issues`);
  url.searchParams.set("state", "all");
  url.searchParams.set("sort", "created");
  url.searchParams.set("direction", "desc");
  url.searchParams.set("per_page", "30");
  if (labeled) url.searchParams.set("labels", SUBMISSION_LABEL);
  const response = await gh(token, url);
  if (!response?.ok) return false;
  const issues = (await response.json()) as { title?: string; body?: string | null; created_at?: string }[];
  if (!Array.isArray(issues)) return false;
  const cutoff = Date.now() - 60 * 60 * 1000;
  const email = submission.email.toLowerCase();
  const website = submission.website.toLowerCase();
  return issues.some((issue) => {
    const created = Date.parse(issue.created_at ?? "");
    if (!Number.isFinite(created) || created < cutoff) return false;
    const haystack = `${issue.title ?? ""}\n${issue.body ?? ""}`.toLowerCase();
    if (labeled) return haystack.includes(email) || haystack.includes(website);
    return haystack.includes('"status": "pending"') && (haystack.includes(email) || haystack.includes(website));
  });
}

async function createIssue(token: string, repo: string, submission: ToolSubmission, labeled: boolean) {
  const response = await gh(token, `https://api.github.com/repos/${repo}/issues`, {
    method: "POST",
    body: JSON.stringify({
      title: `Tool submission: ${neutralizeMentions(submission.name)}`.slice(0, 240),
      body: submissionIssueBody(submission),
      labels: labeled ? [SUBMISSION_LABEL] : [],
    }),
  });
  if (!response) return { ok: false as const, reason: "github" as const, status: 502 };
  if (response.ok) {
    console.info("[submit-tool] saved", {
      repo,
      name: submission.name,
      website: submission.website,
    });
    return { ok: true as const };
  }
  if (response.status === 422 && labeled) {
    await response.text().catch(() => "");
    const retry = await gh(token, `https://api.github.com/repos/${repo}/issues`, {
      method: "POST",
      body: JSON.stringify({
        title: `Tool submission: ${neutralizeMentions(submission.name)}`.slice(0, 240),
        body: submissionIssueBody(submission),
      }),
    });
    if (retry?.ok) {
      console.info("[submit-tool] saved without label", { repo, name: submission.name });
      return { ok: true as const };
    }
    console.error("[submit-tool] github", retry?.status ?? 502);
    return { ok: false as const, reason: "github" as const, status: retry?.status ?? 502 };
  }
  console.error("[submit-tool] github", response.status, await safeBody(response, token));
  return { ok: false as const, reason: "github" as const, status: response.status };
}

async function gh(token: string, url: string | URL, init?: { method?: string; body?: string }) {
  try {
    return await fetch(url, {
      method: init?.method ?? "GET",
      headers: ghHeaders(token),
      body: init?.body,
      signal: AbortSignal.timeout(10000),
    });
  } catch (error) {
    console.error("[submit-tool] github network", error instanceof Error ? error.message : "error");
    return null;
  }
}

async function safeBody(response: Response, token: string) {
  const text = await response.text().catch(() => "");
  return text.replaceAll(token, "[token]").slice(0, 300);
}
