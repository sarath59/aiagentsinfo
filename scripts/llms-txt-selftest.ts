import assert from "node:assert/strict";
import { checkLlmsHost } from "../lib/llms-txt/check";
import { FetchError, rejectionForLlmsUrl } from "../lib/llms-txt/fetch";
import { generateLlmsTxt } from "../lib/llms-txt/generate";
import { validateLlmsTxt } from "../lib/llms-txt/validate";

const valid = `# Example

> A short summary of the site.

Details stay above the headings.

## Docs

- [Guide](https://example.com/guide.md): Start here.
- [Reference](https://example.com/reference.md): The API.

## Optional

- [Changelog](https://example.com/changelog.md): Secondary.
`;

const parsed = validateLlmsTxt(valid, { baseUrl: "https://example.com/llms.txt" });
assert.equal(parsed.title, "Example");
assert.match(parsed.summary ?? "", /short summary/);
assert.equal(parsed.findings.length, 0);
assert.equal(parsed.links.length, 3);

const html = validateLlmsTxt("<!doctype html><html><title>Missing</title></html>");
assert.equal(html.findings.some((finding) => finding.code === "html" && finding.severity === "error"), true);

const broken = `# Example

> Summary.

## Docs

- [Good](https://example.com/a.md): Ok.
- [Good again](https://example.com/a.md): Duplicate.
- [Relative](/docs/a.md): Relative.
- not a link
- [Script](javascript:alert(1)): Bad.

## Notes

Plain text only.
`;
const messy = validateLlmsTxt(broken, { baseUrl: "https://example.com/llms.txt" });
const codes = new Set(messy.findings.map((finding) => finding.code));
for (const code of ["malformed-links", "relative-urls", "duplicate-urls", "bad-scheme", "sections-without-links", "optional-missing"]) {
  assert.equal(codes.has(code), true, code);
}

assert.match(rejectionForLlmsUrl("http://127.0.0.1/llms.txt") ?? "", /not a public website/);
assert.match(rejectionForLlmsUrl("http://localhost/llms.txt") ?? "", /not a public website/);
assert.match(rejectionForLlmsUrl("http://169.254.169.254/latest/meta-data") ?? "", /not a public website/);
assert.match(rejectionForLlmsUrl("http://10.0.0.1/") ?? "", /not a public website/);
assert.match(rejectionForLlmsUrl("file:///etc/passwd") ?? "", /http or https/);
assert.match(rejectionForLlmsUrl("http://example.com:8080/llms.txt") ?? "", /port 80 or 443/);

const live = process.argv.includes("--live");
if (!live) {
  console.log("llms.txt selftest: structure and SSRF guards passed. Pass --live for network checks.");
  process.exit(0);
}

void runLive();

async function runLive() {

function summarize(label: string, result: Awaited<ReturnType<typeof checkLlmsHost>>) {
  const file = result.llms;
  const counts = file.findings.reduce(
    (sum, finding) => {
      sum[finding.severity] += 1;
      return sum;
    },
    { error: 0, warning: 0, info: 0 },
  );
  console.log(
    JSON.stringify({
      label,
      status: file.status,
      finalUrl: file.finalUrl,
      contentType: file.contentType,
      bytes: file.bytes,
      tokens: file.tokens,
      tokenMethod: file.tokenMethod,
      findings: counts,
      codes: file.findings.map((finding) => finding.code),
      fullStatus: result.llmsFull.status,
      fullBytes: result.llmsFull.bytes,
      fullTokens: result.llmsFull.tokens,
      links: result.links,
    }),
  );
}

const targets = [
  ["aiagentsinfo.com", "has-file"],
  ["developers.openai.com", "valid-file"],
  ["example.com", "missing"],
  ["docs.cursor.com", "redirect-html"],
] as const;

for (const [target, label] of targets) {
  try {
    const result = await checkLlmsHost(target, { checkLinks: true });
    summarize(label, result);
  } catch (error) {
    const message = error instanceof FetchError ? error.message : String(error);
    console.log(JSON.stringify({ label, error: message }));
  }
}

try {
  const draft = await generateLlmsTxt("aiagentsinfo.com");
  console.log(
    JSON.stringify({
      label: "generate",
      host: draft.host,
      sitemapUrl: draft.sitemapUrl,
      urlsFound: draft.urlsFound,
      urlsUsed: draft.urlsUsed,
      pagesRead: draft.pagesRead,
      tokens: draft.tokens,
      tokenMethod: draft.tokenMethod,
      sections: draft.sections,
      notes: draft.notes,
      startsWithH1: draft.draft.startsWith("# "),
      hasOptional: draft.draft.includes("\n## Optional\n"),
      preview: draft.draft.slice(0, 500),
    }),
  );
} catch (error) {
  const message = error instanceof FetchError ? error.message : String(error);
  console.log(JSON.stringify({ label: "generate", error: message }));
}
}
