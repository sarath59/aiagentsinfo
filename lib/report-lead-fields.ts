import {
  companySizes,
  countries,
  heardAboutOptions,
  industries,
  isDisposableEmailDomain,
  optionValues,
  useForOptions,
} from "@/lib/report-lead-options";
import { honeypotTripped, normalizePublicUrl, textBlocked } from "@/lib/submissions";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const COMPANY_SIZES = optionValues(companySizes);
const INDUSTRIES = optionValues(industries);
const USE_FOR = optionValues(useForOptions);
const HEARD = optionValues(heardAboutOptions);
const COUNTRIES = new Set<string>(countries);

export type ReportLeadInput = {
  fullName: string;
  email: string;
  company: string;
  jobTitle: string;
  companySize: string;
  industry: string;
  country: string;
  useFor: string;
  useForDetail: string;
  heardAbout: string;
  phone: string;
  linkedinUrl: string;
  reportsOptIn: boolean;
  reportSlug: string;
};

export type ReportLead = ReportLeadInput & {
  id: string;
  submittedAt: string;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string;
  utmContent: string;
  userAgent: string;
  countryHeader: string;
};

export type ReportLeadErrors = Partial<Record<keyof ReportLeadInput, string>>;

export function reportLeadHoneypotTripped(input: unknown) {
  return honeypotTripped(input);
}

export function validateReportLead(
  input: unknown,
): { ok: true; value: ReportLeadInput } | { ok: false; errors: ReportLeadErrors } {
  if (!isRecord(input)) {
    return { ok: false, errors: { fullName: "This form could not be read." } };
  }

  const errors: ReportLeadErrors = {};
  const fullName = oneLine(input.fullName, 80);
  const email = oneLine(input.email, 254).toLowerCase();
  const company = oneLine(input.company, 120);
  const jobTitle = oneLine(input.jobTitle, 120);
  const companySize = oneLine(input.companySize, 40);
  const industry = oneLine(input.industry, 40);
  const country = oneLine(input.country, 80);
  const useFor = oneLine(input.useFor, 40);
  const useForDetail = clipText(input.useForDetail, 500);
  const heardAbout = oneLine(input.heardAbout, 40);
  const phone = oneLine(input.phone, 40);
  const reportSlug = oneLine(input.reportSlug, 80);
  const linkedin = linkedinUrl(input.linkedinUrl);

  if (fullName.length < 2) errors.fullName = "Enter your full name.";
  if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
    errors.email = "Enter a work email, such as name@company.com.";
  } else if (isDisposableEmailDomain(email)) {
    errors.email = "Use a work email. Disposable inboxes are not accepted.";
  }
  if (company.length < 2) errors.company = "Enter your company.";
  if (jobTitle.length < 2) errors.jobTitle = "Enter your job title or role.";
  if (!COMPANY_SIZES.has(companySize)) errors.companySize = "Choose a company size.";
  if (!INDUSTRIES.has(industry)) errors.industry = "Choose an industry.";
  if (!COUNTRIES.has(country)) errors.country = "Choose a country.";
  if (!USE_FOR.has(useFor)) errors.useFor = "Choose what you will use the report for.";
  if (!HEARD.has(heardAbout)) errors.heardAbout = "Choose how you heard about us.";
  if (phone && !validPhone(phone)) errors.phone = "Enter a phone number, or leave it blank.";
  if (!linkedin.ok) errors.linkedinUrl = "Enter a linkedin.com URL, or leave it blank.";
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(reportSlug)) errors.reportSlug = "Open the report and use the form on that page.";

  if (!errors.fullName && textBlocked(fullName)) errors.fullName = "Remove language that can't be saved.";
  if (!errors.company && textBlocked(company)) errors.company = "Remove language that can't be saved.";
  if (!errors.jobTitle && textBlocked(jobTitle)) errors.jobTitle = "Remove language that can't be saved.";
  if (!errors.useForDetail && textBlocked(useForDetail)) errors.useForDetail = "Remove language that can't be saved.";

  if (Object.keys(errors).length || !linkedin.ok) return { ok: false, errors };

  return {
    ok: true,
    value: {
      fullName,
      email,
      company,
      jobTitle,
      companySize,
      industry,
      country,
      useFor,
      useForDetail,
      heardAbout,
      phone,
      linkedinUrl: linkedin.url,
      reportsOptIn: isChecked(input.reportsOptIn),
      reportSlug,
    },
  };
}

export function utmFromUrl(value: string) {
  const empty = { utmSource: "", utmMedium: "", utmCampaign: "", utmTerm: "", utmContent: "" };
  try {
    const url = new URL(value);
    return {
      utmSource: clip(url.searchParams.get("utm_source") ?? ""),
      utmMedium: clip(url.searchParams.get("utm_medium") ?? ""),
      utmCampaign: clip(url.searchParams.get("utm_campaign") ?? ""),
      utmTerm: clip(url.searchParams.get("utm_term") ?? ""),
      utmContent: clip(url.searchParams.get("utm_content") ?? ""),
    };
  } catch {
    return empty;
  }
}

export function mergeUtm(
  primary: ReturnType<typeof utmFromUrl>,
  fallback: ReturnType<typeof utmFromUrl>,
) {
  return {
    utmSource: primary.utmSource || fallback.utmSource,
    utmMedium: primary.utmMedium || fallback.utmMedium,
    utmCampaign: primary.utmCampaign || fallback.utmCampaign,
    utmTerm: primary.utmTerm || fallback.utmTerm,
    utmContent: primary.utmContent || fallback.utmContent,
  };
}

function linkedinUrl(value: unknown): { ok: true; url: string } | { ok: false } {
  const parsed = normalizePublicUrl(oneLine(value, 300), 300);
  if (!parsed.ok) return { ok: false };
  if (!parsed.url) return { ok: true, url: "" };
  let host = "";
  try {
    host = new URL(parsed.url).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return { ok: false };
  }
  if (host !== "linkedin.com") return { ok: false };
  return { ok: true, url: parsed.url };
}

function validPhone(value: string) {
  if (!/^[0-9+().\-\s]+$/.test(value)) return false;
  const digits = value.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

function isChecked(value: unknown) {
  return value === true || value === "true" || value === "on" || value === "yes";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function clip(value: string, max = 200) {
  return value.replace(/\s+/g, " ").trim().slice(0, max);
}

function oneLine(value: unknown, max: number) {
  if (typeof value === "number" && Number.isFinite(value)) return clip(String(value), max);
  if (typeof value !== "string") return "";
  return clip(value.replace(/[\u0000-\u001F\u007F]/g, ""), max);
}

function clipText(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, max);
}
