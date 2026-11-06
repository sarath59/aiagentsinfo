import { collectTakenSlugs } from "@/lib/submission-files";
import {
  neutralizeMentions,
  publicSubmissionRecord,
  submissionIssueBody,
  suggestSlug,
  websiteDomain,
  type ToolSubmission,
} from "@/lib/submissions";

export const SUBMISSION_LABEL = "tool-submission";
export const SITE_REPO = "sarath59/aiagentsinfo";

export function submissionsToken() {
  const token = process.env.GITHUB_SUBMISSIONS_TOKEN?.trim();
  return token || null;
}

/** Private repo for an extra copy of the submitter email. The submission JSON always keeps it. */
export function privateIssueRepo() {
  const repo = process.env.GITHUB_SUBMISSIONS_REPO?.trim();
  if (!repo) return null;
  if (!/^[\w.-]+\/[\w.-]+$/.test(repo)) {
    throw new Error("GITHUB_SUBMISSIONS_REPO must look like owner/name.");
  }
  if (repo.toLowerCase() === SITE_REPO) return null;
  return repo;
}

export type PublishResult =
  | { ok: true }
  | { ok: false; reason: "duplicate" | "github"; status: number };

export async function publishSubmission(submission: ToolSubmission): Promise<PublishResult> {
  const token = submissionsToken();
  if (!token) return { ok: false, reason: "github", status: 503 };

  const domain = websiteDomain(submission.website);
  const remoteDomains = await remoteSubmissionDomains(token);
  if (!remoteDomains) return { ok: false, reason: "github", status: 502 };
  if (domain && remoteDomains.has(domain)) {
    return { ok: false, reason: "duplicate", status: 409 };
  }

  const committed = await commitApprovedFile(token, submission);
  if (!committed.ok) return committed;

  const repo = privateIssueRepo();
  if (repo && submission.email) {
    const saved = await createPrivateIssue(token, repo, { ...submission, slug: committed.slug });
    if (!saved) console.error("[submit-tool] private issue was not saved");
  }
  return { ok: true };
}

async function commitApprovedFile(
  token: string,
  submission: ToolSubmission,
): Promise<{ ok: true; slug: string } | { ok: false; reason: "duplicate" | "github"; status: number }> {
  const taken = collectTakenSlugs();
  let record = publicSubmissionRecord(submission);

  for (let attempt = 0; attempt < 5; attempt += 1) {
    const path = `data/submissions/${record.slug}.json`;
    const url = `https://api.github.com/repos/${SITE_REPO}/contents/${path}`;
    const existing = await gh(token, `${url}?ref=main`);
    if (!existing) return { ok: false, reason: "github", status: 502 };
    if (existing.ok) {
      await existing.body?.cancel().catch(() => undefined);
      taken.add(record.slug);
      const next = suggestSlug(submission.name, taken);
      if (next === record.slug) return { ok: false, reason: "duplicate", status: 409 };
      record = { ...record, slug: next };
      continue;
    }
    if (existing.status !== 404) {
      console.error("[submit-tool] contents lookup", existing.status, await safeBody(existing, token));
      return { ok: false, reason: "github", status: existing.status };
    }
    await existing.body?.cancel().catch(() => undefined);

    const response = await gh(token, url, {
      method: "PUT",
      body: JSON.stringify({
        message: `Add directory submission: ${record.name}`.slice(0, 240),
        content: Buffer.from(`${JSON.stringify(record, null, 2)}\n`, "utf8").toString("base64"),
        branch: "main",
      }),
    });
    if (response?.ok) {
      await response.body?.cancel().catch(() => undefined);
      console.info("[submit-tool] published", { slug: record.slug, website: record.website });
      return { ok: true, slug: record.slug };
    }
    console.error("[submit-tool] contents", response?.status ?? 502, response ? await safeBody(response, token) : "");
    return { ok: false, reason: "github", status: response?.status ?? 502 };
  }

  return { ok: false, reason: "duplicate", status: 409 };
}

async function remoteSubmissionDomains(token: string) {
  const domains = new Set<string>();
  const listing = await gh(token, `https://api.github.com/repos/${SITE_REPO}/contents/data/submissions?ref=main`);
  if (!listing) return null;
  if (listing.status === 404) {
    await listing.body?.cancel().catch(() => undefined);
    return domains;
  }
  if (!listing.ok) {
    await listing.body?.cancel().catch(() => undefined);
    return null;
  }
  const entries = (await listing.json()) as { name?: string; type?: string; url?: string }[];
  if (!Array.isArray(entries)) return domains;
  const files = entries.filter(
    (entry) =>
      entry.type === "file" &&
      entry.url &&
      entry.name?.endsWith(".json") &&
      !entry.name.startsWith(".") &&
      !entry.name.startsWith("_"),
  );
  for (let index = 0; index < files.length; index += 8) {
    const batch = files.slice(index, index + 8);
    await Promise.all(
      batch.map(async (entry) => {
        const file = await gh(token, entry.url as string);
        if (!file?.ok) {
          await file?.body?.cancel().catch(() => undefined);
          return;
        }
        const body = (await file.json()) as { content?: string; encoding?: string };
        if (body.encoding !== "base64" || !body.content) return;
        try {
          const parsed = JSON.parse(Buffer.from(body.content.replace(/\n/g, ""), "base64").toString("utf8")) as {
            website?: string;
          };
          const domain = websiteDomain(parsed.website ?? "");
          if (domain) domains.add(domain);
        } catch {
          // Ignore a file that is not submission JSON. The directory build reports those.
        }
      }),
    );
  }
  return domains;
}

async function createPrivateIssue(token: string, repo: string, submission: ToolSubmission) {
  const labeled = await ensureLabel(token, repo);
  const response = await gh(token, `https://api.github.com/repos/${repo}/issues`, {
    method: "POST",
    body: JSON.stringify({
      title: `Tool submission: ${neutralizeMentions(submission.name)}`.slice(0, 240),
      body: submissionIssueBody(submission),
      labels: labeled ? [SUBMISSION_LABEL] : [],
    }),
  });
  if (response?.ok) {
    await response.body?.cancel().catch(() => undefined);
    return true;
  }
  if (response?.status === 422 && labeled) {
    await response.text().catch(() => "");
    const retry = await gh(token, `https://api.github.com/repos/${repo}/issues`, {
      method: "POST",
      body: JSON.stringify({
        title: `Tool submission: ${neutralizeMentions(submission.name)}`.slice(0, 240),
        body: submissionIssueBody(submission),
      }),
    });
    if (retry?.ok) {
      await retry.body?.cancel().catch(() => undefined);
      return true;
    }
    console.error("[submit-tool] private issue", retry?.status ?? 502);
    return false;
  }
  console.error("[submit-tool] private issue", response?.status ?? 502, response ? await safeBody(response, token) : "");
  return false;
}

async function ensureLabel(token: string, repo: string) {
  const existing = await gh(
    token,
    `https://api.github.com/repos/${repo}/labels/${encodeURIComponent(SUBMISSION_LABEL)}`,
  );
  if (existing?.ok) {
    await existing.body?.cancel().catch(() => undefined);
    return true;
  }
  if (existing && existing.status !== 404) {
    await existing.body?.cancel().catch(() => undefined);
    return false;
  }
  await existing?.body?.cancel().catch(() => undefined);
  const created = await gh(token, `https://api.github.com/repos/${repo}/labels`, {
    method: "POST",
    body: JSON.stringify({
      name: SUBMISSION_LABEL,
      color: "0C5CAD",
      description: "Submitter email for an auto-published directory listing. Not shown on the site.",
    }),
  });
  await created?.body?.cancel().catch(() => undefined);
  return Boolean(created && (created.ok || created.status === 422));
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

async function gh(token: string, url: string, init?: { method?: string; body?: string }) {
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
