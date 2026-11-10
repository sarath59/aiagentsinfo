"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { trackGoal } from "@/lib/analytics";
import {
  REPORT_HONEYPOT_FIELD,
  companySizes,
  countries,
  heardAboutOptions,
  industries,
  reportSlugFromPath,
  useForOptions,
} from "@/lib/report-lead-options";

type DownloadLink = { label: string; href: string };
type FieldErrors = Partial<Record<string, string>>;

const inputClass =
  "focus-ring w-full rounded-xl border border-[var(--stroke)] bg-white px-3.5 py-2.5 text-[15px] text-[var(--fg)]";

export function ReportPrintNotice() {
  const slug = reportSlugFromPath(usePathname());
  if (!slug) return null;
  const url = `https://www.aiagentsinfo.com/reports/${slug}`;
  return <p className="report-print-notice">{`Download the full report at ${url}`}</p>;
}

export function ReportDownloadGate() {
  const slug = reportSlugFromPath(usePathname());
  if (!slug) return null;
  return <ReportDownloadForm key={slug} slug={slug} />;
}

function ReportDownloadForm({ slug }: { slug: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [downloads, setDownloads] = useState<DownloadLink[]>([]);
  const [expires, setExpires] = useState(30);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("loading");
    setMessage("");
    setErrors({});
    try {
      const response = await fetch("/api/reports/download", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          fullName: data.get("fullName"),
          email: data.get("email"),
          company: data.get("company"),
          jobTitle: data.get("jobTitle"),
          companySize: data.get("companySize"),
          industry: data.get("industry"),
          country: data.get("country"),
          useFor: data.get("useFor"),
          useForDetail: data.get("useForDetail"),
          heardAbout: data.get("heardAbout"),
          phone: data.get("phone"),
          linkedinUrl: data.get("linkedinUrl"),
          reportsOptIn: data.get("reportsOptIn") === "on",
          reportSlug: slug,
          pageUrl: window.location.href,
          [REPORT_HONEYPOT_FIELD]: data.get(REPORT_HONEYPOT_FIELD),
        }),
      });
      const body = (await response.json()) as {
        ok?: boolean;
        message?: string;
        errors?: FieldErrors;
        downloads?: DownloadLink[];
        expiresInMinutes?: number;
      };
      if (!response.ok || !body.ok) {
        setStatus("error");
        setMessage(body.message || "The form could not be sent.");
        setErrors(body.errors || {});
        return;
      }
      if (!body.downloads?.length) {
        setStatus("error");
        setMessage("Thanks. If a file does not appear, submit the form again.");
        return;
      }
      setDownloads(body.downloads);
      setExpires(body.expiresInMinutes || 30);
      setStatus("ready");
      trackGoal("report_download");
    } catch {
      setStatus("error");
      setMessage("The form could not be sent. Check the connection and try again.");
    }
  }

  return (
    <section id="download-report" className="report-download no-print" aria-labelledby="download-report-heading">
      <div className="report-download-card">
        <p className="kicker">Report download</p>
        {status === "ready" ? (
          <>
            <h2 id="download-report-heading">Your copy is ready</h2>
            <p className="report-download-dek">
              The link works for {expires} minutes. Submit the form again after that if you need a new one.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {downloads.map((item, index) => (
                <a
                  key={item.href}
                  className={index === 0 ? "btn-primary px-4 py-2.5 text-sm" : "btn-ghost px-4 py-2.5 text-sm"}
                  href={item.href}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </>
        ) : (
          <>
            <h2 id="download-report-heading">Download this report</h2>
            <p className="report-download-dek">
              The page above is the report. Tell us who it is for, and we will issue the PDF. A CSV is included when
              this report publishes tables. Nothing is emailed unless you ask.
            </p>
            <form className="report-download-grid" onSubmit={onSubmit} noValidate>
              <Field label="Full name" name="fullName" autoComplete="name" required error={errors.fullName} />
              <Field label="Work email" name="email" type="email" autoComplete="email" required error={errors.email} />
              <Field label="Company" name="company" autoComplete="organization" required error={errors.company} />
              <Field label="Job title / role" name="jobTitle" autoComplete="organization-title" required error={errors.jobTitle} />
              <SelectField label="Company size" name="companySize" required error={errors.companySize} options={companySizes} />
              <SelectField label="Industry" name="industry" required error={errors.industry} options={industries} />
              <SelectField
                label="Country"
                name="country"
                required
                error={errors.country}
                options={countries.map((country) => ({ value: country, label: country }))}
              />
              <SelectField label="How did you hear about us?" name="heardAbout" required error={errors.heardAbout} options={heardAboutOptions} />
              <div className="report-download-span">
                <SelectField
                  label="What will you use this report for?"
                  name="useFor"
                  required
                  error={errors.useFor}
                  options={useForOptions}
                />
              </div>
              <div className="report-download-span">
                <label className="report-field" htmlFor="report-use-detail">
                  <span>Anything we should know? <span className="font-normal text-[var(--muted)]">Optional</span></span>
                  <textarea id="report-use-detail" className={inputClass} name="useForDetail" maxLength={500} rows={3} aria-invalid={errors.useForDetail ? true : undefined} />
                </label>
                {errors.useForDetail ? <p className="report-field-error">{errors.useForDetail}</p> : null}
              </div>
              <Field label="Phone" name="phone" type="tel" autoComplete="tel" error={errors.phone} optional />
              <Field label="LinkedIn URL" name="linkedinUrl" type="url" autoComplete="url" error={errors.linkedinUrl} optional placeholder="https://www.linkedin.com/in/…" />
              <div className="report-download-span">
                <label className="report-check">
                  <input className="mt-1" type="checkbox" name="reportsOptIn" />
                  <span>Email me new aiagentsinfo.com reports</span>
                </label>
              </div>
              <div className="report-honeypot" aria-hidden="true">
                <label htmlFor="report-hp">Company website</label>
                <input id="report-hp" name={REPORT_HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
              </div>
              {message ? (
                <p className="report-download-span report-form-message" role="alert">
                  {message}
                </p>
              ) : null}
              <div className="report-download-span">
                <button className="btn-primary px-5 py-2.5 text-sm" type="submit" disabled={status === "loading"}>
                  {status === "loading" ? "Sending…" : "Download this report"}
                </button>
                <p className="report-privacy">
                  We save this so we know who requested the file and, only if you check the box, so we can email new reports.
                  We do not sell the form.{" "}
                  <Link href="/privacy">Privacy</Link>
                </p>
              </div>
            </form>
          </>
        )}
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  required,
  optional,
  error,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  placeholder?: string;
}) {
  const id = `report-${name}`;
  return (
    <div>
      <label className="report-field" htmlFor={id}>
        <span>
          {label}
          {optional ? <span className="font-normal text-[var(--muted)]"> Optional</span> : null}
        </span>
        <input
          id={id}
          className={inputClass}
          name={name}
          type={type}
          autoComplete={autoComplete}
          required={required}
          maxLength={type === "email" ? 254 : 200}
          placeholder={placeholder}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      </label>
      {error ? (
        <p id={`${id}-error`} className="report-field-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
  required,
  error,
}: {
  label: string;
  name: string;
  options: readonly { value: string; label: string }[];
  required?: boolean;
  error?: string;
}) {
  const id = `report-${name}`;
  return (
    <div>
      <label className="report-field" htmlFor={id}>
        <span>{label}</span>
        <select
          id={id}
          className={inputClass}
          name={name}
          required={required}
          defaultValue=""
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
        >
          <option value="">Select</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      {error ? (
        <p id={`${id}-error`} className="report-field-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}
