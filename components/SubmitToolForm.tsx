"use client";

import { cloneElement, useState, type FormEvent, type ReactElement } from "react";
import { directoryCategories, pricingModels } from "@/lib/directory-meta";
import {
  HONEYPOT_FIELD,
  SUBMISSION_SUCCESS_MESSAGE,
  makerTypes,
  submissionMailto,
  toolTypes,
  validateSubmission,
  type FieldErrors,
  type SubmissionField,
} from "@/lib/submissions";

const inputClass =
  "focus-ring w-full rounded-2xl border border-[var(--stroke)] bg-white px-4 py-3 text-[var(--fg)]";

type ControlProps = {
  id?: string;
  className?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
  "aria-required"?: boolean;
};

const FIELD_IDS: Record<SubmissionField, string> = {
  name: "tool-name",
  website: "tool-website",
  tagline: "tool-tagline",
  description: "tool-description",
  category: "tool-category",
  type: "tool-type",
  pricing: "tool-pricing",
  startingPrice: "tool-starting-price",
  logoUrl: "tool-logo-url",
  makerName: "maker-name",
  makerX: "maker-x",
  makerType: "maker-type",
  ycBatch: "maker-yc-batch",
  launchYear: "tool-launch-year",
  revenueSourceUrl: "tool-revenue-url",
  githubUrl: "tool-github",
  email: "submitter-email",
  consent: "submit-consent",
};

export function SubmitToolForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "fallback">("idle");
  const [message, setMessage] = useState("");
  const [mailto, setMailto] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [makerType, setMakerType] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = readForm(new FormData(form));
    const clientCheck = validateSubmission(payload);
    if (!clientCheck.ok) {
      setErrors(clientCheck.errors);
      setStatus("idle");
      setMessage("");
      focusFirst(clientCheck.errors);
      return;
    }

    setStatus("loading");
    setErrors({});
    setMessage("");
    try {
      const response = await fetch("/api/submit-tool", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await response.json().catch(() => ({}))) as {
        message?: string;
        mailto?: string;
        errors?: FieldErrors;
      };
      if (json.errors && Object.keys(json.errors).length) {
        setStatus("idle");
        setErrors(json.errors);
        setMessage(json.message || "Check the highlighted fields.");
        focusFirst(json.errors);
        return;
      }
      if (!response.ok) {
        setStatus("fallback");
        setMessage(json.message || "We couldn't save this submission.");
        setMailto(json.mailto || submissionMailto(payload));
        return;
      }
      setStatus("success");
      setMessage(json.message || SUBMISSION_SUCCESS_MESSAGE);
      setMailto("");
      form.reset();
      setMakerType("");
    } catch {
      setStatus("fallback");
      setMessage("We couldn't reach the server. Email this submission instead.");
      setMailto(submissionMailto(payload));
    }
  }

  if (status === "success") {
    return (
      <div className="glass rounded-3xl p-6" role="status">
        <p className="kicker">Received</p>
        <p className="mt-3 text-lg leading-relaxed">{message}</p>
        <button
          type="button"
          className="btn-ghost mt-6 px-4 py-2 text-sm"
          onClick={() => {
            setStatus("idle");
            setMessage("");
          }}
        >
          Submit another
        </button>
      </div>
    );
  }

  return (
    <form
      className="grid gap-10"
      aria-label="Submit your tool"
      noValidate
      onSubmit={onSubmit}
      onChange={(event) => {
        const target = event.target;
        if (
          !(target instanceof HTMLInputElement) &&
          !(target instanceof HTMLTextAreaElement) &&
          !(target instanceof HTMLSelectElement)
        ) {
          return;
        }
        const name = target.name as SubmissionField;
        if (!name) return;
        setErrors((current) => {
          if (!current[name]) return current;
          const next = { ...current };
          delete next[name];
          return next;
        });
      }}
    >
      <p className="text-sm text-[var(--muted)]">Required fields are marked with an asterisk.</p>
      {message && status !== "fallback" ? (
        <p className="text-sm text-red-800" role="alert">
          {message}
        </p>
      ) : null}
      {status === "fallback" ? (
        <div className="rounded-3xl border border-[var(--stroke)] bg-white p-5" role="alert">
          <p className="kicker">Email it instead</p>
          <p className="mt-3 text-sm leading-relaxed">{message}</p>
          {mailto ? (
            <a className="btn-primary mt-5 px-5 py-3 text-sm" href={mailto}>
              Email this submission
            </a>
          ) : null}
        </div>
      ) : null}

      <fieldset className="grid gap-4 border-0 p-0">
        <legend className="kicker mb-2">Product</legend>
        <Field id={FIELD_IDS.name} label="Tool name" required error={errors.name}>
          <input name="name" required autoComplete="off" maxLength={80} className={inputClass} />
        </Field>
        <Field
          id={FIELD_IDS.website}
          label="Website URL"
          required
          error={errors.website}
          hint="The official site we will open during the fact-check."
        >
          <input name="website" type="url" required inputMode="url" placeholder="https://" maxLength={300} className={inputClass} />
        </Field>
        <Field id={FIELD_IDS.tagline} label="One-line tagline" required error={errors.tagline}>
          <input name="tagline" required maxLength={140} className={inputClass} />
        </Field>
        <Field id={FIELD_IDS.description} label="Full description" required error={errors.description}>
          <textarea name="description" required rows={6} maxLength={5000} className={inputClass} />
        </Field>
        <Field id={FIELD_IDS.category} label="Category" required error={errors.category}>
          <select name="category" required defaultValue="" className={inputClass}>
            <option value="">Select a category</option>
            {directoryCategories.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.title}
              </option>
            ))}
          </select>
        </Field>
        <Field id={FIELD_IDS.type} label="Type" error={errors.type} hint="Optional.">
          <select name="type" defaultValue="" className={inputClass}>
            <option value="">Select a type</option>
            {toolTypes.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.title}
              </option>
            ))}
          </select>
        </Field>
      </fieldset>

      <fieldset className="grid gap-4 border-0 p-0">
        <legend className="kicker mb-2">Pricing</legend>
        <Field id={FIELD_IDS.pricing} label="Pricing model" required error={errors.pricing}>
          <select name="pricing" required defaultValue="" className={inputClass}>
            <option value="">Select pricing</option>
            {pricingModels.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.title}
              </option>
            ))}
          </select>
        </Field>
        <Field
          id={FIELD_IDS.startingPrice}
          label="Starting price"
          error={errors.startingPrice}
          hint="Optional. For example, Free or $20/month."
        >
          <input name="startingPrice" maxLength={60} className={inputClass} />
        </Field>
      </fieldset>

      <fieldset className="grid gap-4 border-0 p-0">
        <legend className="kicker mb-2">Logo and maker</legend>
        <Field
          id={FIELD_IDS.logoUrl}
          label="Logo URL"
          error={errors.logoUrl}
          hint="Paste a public image address, including one from a file you already uploaded to your site or GitHub. This form does not host logo files."
        >
          <input name="logoUrl" type="url" inputMode="url" placeholder="https://" maxLength={500} className={inputClass} />
        </Field>
        <Field id={FIELD_IDS.makerName} label="Founder or maker name" error={errors.makerName}>
          <input name="makerName" autoComplete="name" maxLength={80} className={inputClass} />
        </Field>
        <Field id={FIELD_IDS.makerX} label="Maker X handle" error={errors.makerX} hint="Optional. With or without @.">
          <input name="makerX" maxLength={40} autoComplete="off" className={inputClass} />
        </Field>
        <Field id={FIELD_IDS.makerType} label="Maker type" error={errors.makerType}>
          <select
            name="makerType"
            defaultValue=""
            className={inputClass}
            onChange={(event) => setMakerType(event.target.value)}
          >
            <option value="">Select a maker type</option>
            {makerTypes.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.title}
              </option>
            ))}
          </select>
        </Field>
        {makerType === "yc" ? (
          <Field id={FIELD_IDS.ycBatch} label="YC batch" required error={errors.ycBatch} hint="For example, W26 or S25.">
            <input name="ycBatch" required maxLength={20} className={inputClass} />
          </Field>
        ) : (
          <input type="hidden" name="ycBatch" defaultValue="" />
        )}
        <Field id={FIELD_IDS.launchYear} label="Launch year" error={errors.launchYear}>
          <input name="launchYear" inputMode="numeric" min={1990} max={2100} className={inputClass} />
        </Field>
      </fieldset>

      <fieldset className="grid gap-4 border-0 p-0">
        <legend className="kicker mb-2">Links</legend>
        <Field
          id={FIELD_IDS.revenueSourceUrl}
          label="Public revenue source link"
          error={errors.revenueSourceUrl}
          hint="Optional. A public page such as TrustMRR or another source a reader can open."
        >
          <input name="revenueSourceUrl" type="url" inputMode="url" placeholder="https://" maxLength={500} className={inputClass} />
        </Field>
        <Field id={FIELD_IDS.githubUrl} label="GitHub URL" error={errors.githubUrl}>
          <input name="githubUrl" type="url" inputMode="url" placeholder="https://github.com/" maxLength={500} className={inputClass} />
        </Field>
      </fieldset>

      <fieldset className="grid gap-4 border-0 p-0">
        <legend className="kicker mb-2">Contact</legend>
        <Field
          id={FIELD_IDS.email}
          label="Your email"
          required
          error={errors.email}
          hint="We use this to follow up. Submissions are filed as GitHub issues for review. On a public repository, that issue, including this email, can be read by anyone."
        >
          <input name="email" type="email" required autoComplete="email" maxLength={254} className={inputClass} />
        </Field>
        <div className="grid gap-1.5">
          <label htmlFor={FIELD_IDS.consent} className="flex items-start gap-3 text-sm leading-relaxed">
            <input
              id={FIELD_IDS.consent}
              name="consent"
              type="checkbox"
              required
              aria-invalid={errors.consent ? true : undefined}
              aria-describedby={errors.consent ? `${FIELD_IDS.consent}-error` : undefined}
              className="mt-1 h-4 w-4 accent-[#0c5cad]"
            />
            <span>
              I confirm this information is accurate and I am allowed to submit it.
              <span className="text-[var(--gold)]" aria-hidden="true">
                {" "}
                *
              </span>
              <span className="sr-only"> required</span>
            </span>
          </label>
          {errors.consent ? (
            <p id={`${FIELD_IDS.consent}-error`} className="text-sm text-red-800">
              {errors.consent}
            </p>
          ) : null}
        </div>
      </fieldset>

      <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
        <label htmlFor="hp-field">Company website</label>
        <input
          id="hp-field"
          name={HONEYPOT_FIELD}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary justify-self-start px-6 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Submit your tool"}
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  required,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactElement<ControlProps>;
}) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  return (
    <div className="grid gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
        {required ? (
          <>
            <span aria-hidden="true" className="text-[var(--gold)]">
              {" "}
              *
            </span>
            <span className="sr-only"> required</span>
          </>
        ) : null}
      </label>
      {cloneElement(children, {
        id,
        className: `${children.props.className ?? ""} ${error ? "border-red-800" : ""}`.trim(),
        "aria-describedby": describedBy,
        "aria-invalid": error ? true : undefined,
        "aria-required": required ? true : undefined,
      })}
      {hint ? (
        <p id={hintId} className="text-xs leading-relaxed text-[var(--muted)]">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="text-sm text-red-800">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function readForm(form: FormData): Record<string, string | boolean> {
  const value = (key: string) => {
    const raw = form.get(key);
    return typeof raw === "string" ? raw : "";
  };
  return {
    name: value("name"),
    website: value("website"),
    tagline: value("tagline"),
    description: value("description"),
    category: value("category"),
    type: value("type"),
    pricing: value("pricing"),
    startingPrice: value("startingPrice"),
    logoUrl: value("logoUrl"),
    makerName: value("makerName"),
    makerX: value("makerX"),
    makerType: value("makerType"),
    ycBatch: value("ycBatch"),
    launchYear: value("launchYear"),
    revenueSourceUrl: value("revenueSourceUrl"),
    githubUrl: value("githubUrl"),
    email: value("email"),
    consent: form.get("consent") === "on",
    [HONEYPOT_FIELD]: value(HONEYPOT_FIELD),
  };
}

function focusFirst(fieldErrors: FieldErrors) {
  const first = (Object.keys(FIELD_IDS) as SubmissionField[]).find((key) => fieldErrors[key]);
  if (!first) return;
  document.getElementById(FIELD_IDS[first])?.focus();
}
