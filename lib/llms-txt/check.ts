import { FetchError, fetchPublic, fetchStatus, originFromInput, rejectionForLlmsUrl } from "@/lib/llms-txt/fetch";
import {
  CHECK_BUDGET_MS,
  FILE_TIMEOUT_MS,
  LINK_BUDGET_MS,
  LINK_CONCURRENCY,
  MAX_BYTES,
  MAX_LINK_CHECKS,
  PREVIEW_CHARS,
} from "@/lib/llms-txt/limits";
import { mapLimit } from "@/lib/llms-txt/pool";
import { countO200kTokens } from "@/lib/llms-txt/tokens";
import {
  looksLikeHtml,
  validateLlmsTxt,
  type Finding,
  type LlmsValidation,
} from "@/lib/llms-txt/validate";

export type LinkCounts = {
  "2xx": number;
  "3xx": number;
  "4xx": number;
  "5xx": number;
  error: number;
};

export type LinkProbe = {
  url: string;
  status: number | null;
  finalUrl: string | null;
  detail: string;
};

export type LinkCheck = {
  sampled: number;
  totalHttpLinks: number;
  truncated: boolean;
  counts: LinkCounts;
  broken: LinkProbe[];
};

export type FileCheck = {
  name: "llms.txt" | "llms-full.txt";
  requestedUrl: string;
  finalUrl: string | null;
  status: number | null;
  redirects: number;
  contentType: string | null;
  bytes: number;
  truncated: boolean;
  tokens: number | null;
  tokenMethod: string;
  title: string | null;
  summary: string | null;
  sections: { heading: string; links: number }[];
  linkCount: number;
  findings: Finding[];
  preview: string;
  previewTrimmed: boolean;
};

export type HostCheck = {
  input: string;
  host: string;
  checkedAt: string;
  llms: FileCheck;
  llmsFull: FileCheck;
  links: LinkCheck | null;
};

type Fetched = {
  requestedUrl: string;
  finalUrl: string;
  status: number;
  redirects: number;
  contentType: string | null;
  body: string;
  bytes: number;
  truncated: boolean;
};

export async function checkLlmsHost(input: string, options?: { checkLinks?: boolean }): Promise<HostCheck> {
  const origin = originFromInput(input);
  const deadline = Date.now() + CHECK_BUDGET_MS;
  const llmsUrl = new URL("/llms.txt", origin);
  const fullUrl = new URL("/llms-full.txt", origin);
  const [llmsFetched, fullFetched] = await Promise.all([
    fetchFile(llmsUrl, deadline),
    fetchFile(fullUrl, deadline),
  ]);
  const llms = reportFile("llms.txt", llmsUrl, llmsFetched, "spec");
  const llmsFull = reportFile("llms-full.txt", fullUrl, fullFetched, "companion");
  const linkDeadline = Math.min(deadline, Date.now() + LINK_BUDGET_MS);
  const links =
    options?.checkLinks === false ? null : await checkAbsoluteLinks(absoluteLinks(llmsFetched), linkDeadline);
  if (llmsFetched && "error" in llmsFetched && fullFetched && "error" in fullFetched) {
    const message = llmsFetched.error;
    if (/did not resolve|not a public website|valid URL|Enter a domain|port 80/.test(message)) {
      throw new FetchError(message);
    }
  }
  return {
    input: input.trim(),
    host: origin.host,
    checkedAt: new Date().toISOString(),
    llms,
    llmsFull,
    links,
  };
}

export async function checkAbsoluteLinks(urls: string[], deadline = Date.now() + LINK_BUDGET_MS): Promise<LinkCheck> {
  const unique: string[] = [];
  const seen = new Set<string>();
  for (const raw of urls) {
    if (typeof raw !== "string") continue;
    const trimmed = raw.trim();
    if (!/^https?:\/\//i.test(trimmed) || seen.has(trimmed)) continue;
    seen.add(trimmed);
    unique.push(trimmed);
  }
  const sample = unique.slice(0, MAX_LINK_CHECKS);
  const counts: LinkCounts = { "2xx": 0, "3xx": 0, "4xx": 0, "5xx": 0, error: 0 };
  const probes = await mapLimit(sample, LINK_CONCURRENCY, async (url) => probeOne(url, deadline));
  const broken: LinkProbe[] = [];
  for (const probe of probes) {
    if (probe.bucket === "2xx") counts["2xx"] += 1;
    else if (probe.bucket === "3xx") counts["3xx"] += 1;
    else if (probe.bucket === "4xx") counts["4xx"] += 1;
    else if (probe.bucket === "5xx") counts["5xx"] += 1;
    else counts.error += 1;
    if (probe.bucket === "4xx" || probe.bucket === "5xx" || probe.bucket === "error") broken.push(probe.row);
  }
  return {
    sampled: sample.length,
    totalHttpLinks: unique.length,
    truncated: unique.length > sample.length,
    counts,
    broken,
  };
}

function absoluteLinks(fetched: Fetched | { error: string } | null) {
  if (!fetched || "error" in fetched) return [];
  if (fetched.status < 200 || fetched.status >= 300) return [];
  if (looksLikeHtml(fetched.body, fetched.contentType)) return [];
  return validateLlmsTxt(fetched.body, { baseUrl: fetched.finalUrl }).links
    .filter((link) => link.absolute)
    .map((link) => link.url);
}

async function fetchFile(url: URL, deadline: number): Promise<Fetched | { error: string }> {
  try {
    const result = await fetchPublic(url, { method: "GET", maxBytes: MAX_BYTES, timeoutMs: FILE_TIMEOUT_MS, deadline });
    return result;
  } catch (error) {
    const message = error instanceof FetchError ? error.message : "The site could not be checked.";
    return { error: message };
  }
}

function reportFile(
  name: "llms.txt" | "llms-full.txt",
  requested: URL,
  fetched: Fetched | { error: string },
  kind: "spec" | "companion",
): FileCheck {
  if ("error" in fetched) {
    return emptyFile(name, requested.toString(), [
      {
        severity: "error",
        code: "fetch-failed",
        message: fetched.error,
        fix: "Check the host spelling, then try the fetch again.",
      },
    ]);
  }
  const tokens = countO200kTokens(fetched.body);
  const html = looksLikeHtml(fetched.body, fetched.contentType);
  const findings: Finding[] = [];
  let validation: LlmsValidation | null = null;

  if (fetched.status === 404 || fetched.status === 410) {
    findings.push(
      kind === "companion"
        ? {
            severity: "info",
            code: "companion-missing",
            message: `HTTP ${fetched.status}. No ${name}. The llmstxt.org v2 spec does not require this file.`,
            fix: "Leave it missing, or publish a longer companion only if you want one document an agent can load whole.",
          }
        : {
            severity: "error",
            code: "missing-file",
            message: `HTTP ${fetched.status}. This host has no ${name}.`,
            fix: "Publish a Markdown file at /llms.txt, or generate a draft from the sitemap.",
          },
    );
  } else if (fetched.status >= 400 && fetched.status < 500) {
    findings.push({
      severity: "error",
      code: "refused",
      message: `HTTP ${fetched.status}. The file was not readable.`,
      fix: "Serve the file to anonymous GET requests on port 443.",
    });
  } else if (fetched.status >= 500 || fetched.status === 0) {
    findings.push({
      severity: "error",
      code: "unreachable",
      message: `HTTP ${fetched.status}. The host did not return the file.`,
      fix: `Retry when the host is returning 200 for /${name}.`,
    });
  } else if (fetched.status >= 300) {
    findings.push({
      severity: "error",
      code: "redirect-left",
      message: `HTTP ${fetched.status} after ${fetched.redirects} redirect${fetched.redirects === 1 ? "" : "s"}.`,
      fix: "Point /llms.txt at a final 200 response within 3 redirects.",
    });
  } else if (html) {
    findings.push({
      severity: "error",
      code: "html",
      message: `HTTP ${fetched.status} with content-type ${fetched.contentType || "HTML"}. The body is a page, so this is a soft 404.`,
      fix: "Serve the Markdown file as text/plain or text/markdown, and stop returning the site HTML for this path.",
    });
  } else if (!fetched.body.trim()) {
    findings.push({
      severity: "error",
      code: "empty",
      message: `HTTP ${fetched.status} and the body is empty.`,
      fix: "Publish a Markdown file whose first line is one H1.",
    });
  } else if (kind === "spec") {
    validation = validateLlmsTxt(fetched.body, { baseUrl: fetched.finalUrl });
    findings.push(...validation.findings);
    if (!fetched.finalUrl.toLowerCase().includes("/llms.txt")) {
      findings.push({
        severity: "warning",
        code: "final-path",
        message: `The final URL is ${fetched.finalUrl}. The fetch did not end on an llms.txt path.`,
        fix: "Redirect /llms.txt to a URL that still ends in llms.txt, or serve the file in place.",
      });
    }
  } else {
    findings.push({
      severity: "info",
      code: "companion-present",
      message:
        "Fetched /llms-full.txt. llmstxt.org v2 specifies /llms.txt and does not define this companion, so it is not scored as a link index.",
      fix: "Keep /llms.txt as the curated index. Use /llms-full.txt only as the long document.",
    });
  }

  if (fetched.truncated) {
    findings.push({
      severity: "warning",
      code: "truncated",
      message: `The body was cut at ${MAX_BYTES} bytes. The token count covers only the kept text.`,
      fix: "Publish a shorter file. The spec keeps the index small and puts detail behind the links.",
    });
  }

  const previewSource = html ? "" : fetched.body;
  const preview = previewSource.slice(0, PREVIEW_CHARS);
  return {
    name,
    requestedUrl: fetched.requestedUrl,
    finalUrl: fetched.finalUrl,
    status: fetched.status,
    redirects: fetched.redirects,
    contentType: fetched.contentType,
    bytes: fetched.bytes,
    truncated: fetched.truncated,
    tokens: tokens.tokens,
    tokenMethod: tokens.method,
    title: validation?.title ?? null,
    summary: validation?.summary ?? null,
    sections: validation?.sections.map((section) => ({ heading: section.heading, links: section.links })) ?? [],
    linkCount: validation?.links.length ?? 0,
    findings,
    preview,
    previewTrimmed: previewSource.length > preview.length,
  };
}

function emptyFile(name: "llms.txt" | "llms-full.txt", requestedUrl: string, findings: Finding[]): FileCheck {
  return {
    name,
    requestedUrl,
    finalUrl: null,
    status: null,
    redirects: 0,
    contentType: null,
    bytes: 0,
    truncated: false,
    tokens: null,
    tokenMethod: "",
    title: null,
    summary: null,
    sections: [],
    linkCount: 0,
    findings,
    preview: "",
    previewTrimmed: false,
  };
}

async function probeOne(raw: string, deadline: number): Promise<{ bucket: keyof LinkCounts; row: LinkProbe }> {
  const row = (status: number | null, finalUrl: string | null, detail: string, bucket: keyof LinkCounts) => ({
    bucket,
    row: { url: raw, status, finalUrl, detail },
  });
  if (Date.now() > deadline - 250) {
    return row(null, null, "Stopped because the link-check time budget ran out.", "error");
  }
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return row(null, null, "The link is not a valid URL.", "error");
  }
  const problem = rejectionForLlmsUrl(url.toString());
  if (problem) return row(null, null, problem, "error");
  try {
    const result = await fetchStatus(url, deadline);
    const bucket = bucketFor(result.status);
    const detail =
      result.redirects > 0 ? `HTTP ${result.status} after ${result.redirects} redirect${result.redirects === 1 ? "" : "s"}.` : `HTTP ${result.status}.`;
    return row(result.status, result.finalUrl, detail, bucket);
  } catch (error) {
    const message = error instanceof FetchError ? error.message : "The link could not be fetched.";
    return row(null, null, message, "error");
  }
}

function bucketFor(status: number): keyof LinkCounts {
  if (status >= 200 && status < 300) return "2xx";
  if (status >= 300 && status < 400) return "3xx";
  if (status >= 400 && status < 500) return "4xx";
  if (status >= 500 && status < 600) return "5xx";
  return "error";
}
