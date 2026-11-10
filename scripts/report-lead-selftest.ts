import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { isDisposableEmailDomain, reportSlugFromPath } from "../lib/report-lead-options";
import { reportLeadHoneypotTripped, validateReportLead } from "../lib/report-lead-fields";
import { signReportDownload, verifyReportDownload } from "../lib/report-download-token";
import { fileLeadStore, removeFileLeadDir } from "../lib/report-lead-store";

process.env.REPORT_DOWNLOAD_SECRET = "selftest-download-secret";

const valid = {
  fullName: "Test Lead",
  email: "ada@example.com",
  company: "Example Desk",
  jobTitle: "Research editor",
  companySize: "11-50",
  industry: "software",
  country: "United Kingdom",
  useFor: "internal-research",
  useForDetail: "Checking the November tables.",
  heardAbout: "search",
  phone: "+44 20 7946 0000",
  linkedinUrl: "https://www.linkedin.com/in/example",
  reportsOptIn: false,
  reportSlug: "ai-agents-in-production-2026",
};

const parsed = validateReportLead(valid);
if (!parsed.ok) throw new Error("expected a valid lead");
const leadInput = parsed.value;
assert.equal(leadInput.email, "ada@example.com");
assert.equal(leadInput.reportsOptIn, false);
assert.equal(leadInput.linkedinUrl.startsWith("https://www.linkedin.com/"), true);

const disposable = validateReportLead({ ...valid, email: "a@mailinator.com" });
assert.equal(disposable.ok, false);
assert.equal(isDisposableEmailDomain("a@guerrillamail.com"), true);
assert.equal(isDisposableEmailDomain("ada@example.com"), false);

const missing = validateReportLead({ ...valid, company: "" });
assert.equal(missing.ok, false);

assert.equal(reportLeadHoneypotTripped({ hp_field: "https://spam.example" }), true);
assert.equal(reportLeadHoneypotTripped({ hp_field: "" }), false);
assert.equal(reportSlugFromPath("/reports/ai-agents-in-2027"), "ai-agents-in-2027");
assert.equal(reportSlugFromPath("/reports"), "");
assert.equal(reportSlugFromPath("/reports/ai-agents-in-2027/pdf"), "");

const now = Date.parse("2026-11-10T15:00:00.000Z");
const token = signReportDownload(valid.reportSlug, "11111111-1111-1111-1111-111111111111", now);
assert.ok(token);
assert.equal(verifyReportDownload(token!, valid.reportSlug, now + 1000), true);
assert.equal(verifyReportDownload(token!, "ai-agents-in-2027", now + 1000), false);
assert.equal(verifyReportDownload(token!, valid.reportSlug, now + 31 * 60 * 1000), false);
assert.equal(verifyReportDownload(`${token}x`, valid.reportSlug, now + 1000), false);
assert.equal(verifyReportDownload("", valid.reportSlug, now), false);

async function main() {
  const dir = await mkdtemp(path.join(tmpdir(), "report-leads-"));
  try {
    const store = fileLeadStore(dir);
    const lead = {
      ...leadInput,
      id: "22222222-2222-2222-2222-222222222222",
      submittedAt: "2026-11-10T15:00:00.000Z",
      referrer: "https://www.aiagentsinfo.com/reports/ai-agents-in-production-2026?utm_source=selftest",
      utmSource: "selftest",
      utmMedium: "",
      utmCampaign: "",
      utmTerm: "",
      utmContent: "",
      userAgent: "selftest",
      countryHeader: "GB",
    };
    await store.save(lead);
    const listed = store.list ? await store.list() : [];
    assert.equal(listed.length, 1);
    assert.equal(listed[0]?.email, "ada@example.com");
    assert.equal(store.delete ? await store.delete(lead.id) : false, true);
    assert.equal(store.list ? (await store.list()).length : -1, 0);
  } finally {
    await rm(dir, { recursive: true, force: true });
    await removeFileLeadDir(dir);
  }
  console.log("report-lead-selftest: ok");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
