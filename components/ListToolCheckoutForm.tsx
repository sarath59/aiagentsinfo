"use client";

import { useState, type FormEvent } from "react";
import { trackGoal } from "@/lib/analytics";
import {
  LIST_TOOL_BUY_CLICK,
  LIST_TOOL_STRIPE_URL,
  listToolMeta,
} from "@/lib/analytics/list-tool-goals";
import { FEATURED_DAYS, FEATURED_PRICE_LABEL } from "@/lib/paid-listings/offer";
import { operator } from "@/lib/site";

/** Details first → save lead → Stripe. Page/dwell tracking stays on ListToolPageTracker. */
export function ListToolCheckoutForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") || "").trim();
    const tool_name = String(data.get("tool_name") || "").trim();
    const tool_url = String(data.get("tool_url") || "").trim();
    const tool_notes = String(data.get("tool_notes") || "").trim();

    setStatus("loading");
    setMessage("");
    trackGoal("list_tool_details_submit", listToolMeta({ placement: "checkout_form" }));

    try {
      const response = await fetch("/api/list-your-tool/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, tool_name, tool_url, tool_notes }),
      });
      const json = (await response.json().catch(() => ({}))) as {
        message?: string;
        stripe_url?: string;
        lead_token?: string;
      };
      if (!response.ok) {
        setStatus("error");
        setMessage(json.message || "Could not save. Try again or email the desk.");
        return;
      }

      trackGoal(
        "list_tool_details_ok",
        listToolMeta({
          placement: "checkout_form",
          code: (json.lead_token || "").slice(0, 8),
        }),
      );
      trackGoal(
        LIST_TOOL_BUY_CLICK,
        listToolMeta({ cta: "stripe_buy", placement: "checkout_form" }),
      );

      window.location.assign(json.stripe_url || LIST_TOOL_STRIPE_URL);
    } catch {
      setStatus("error");
      setMessage(`Network error. Email ${operator.email}, then use the Stripe link.`);
    }
  }

  return (
    <form
      id="list-tool-checkout"
      className="list-tool-form grid gap-4"
      onSubmit={onSubmit}
      data-track-section="checkout"
    >
      <div className="list-tool-form-price">
        <p className="list-tool-form-price-amount">{FEATURED_PRICE_LABEL}</p>
        <p className="list-tool-form-price-note">
          USD · {FEATURED_DAYS}-day featured listing · one Stripe payment
        </p>
      </div>
      <label className="grid gap-1.5 text-sm">
        <span className="list-tool-form-label">Work email</span>
        <input
          name="email"
          type="email"
          required
          maxLength={200}
          autoComplete="email"
          className="rounded-2xl border border-[var(--stroke)] bg-white px-4 py-3"
          placeholder="you@company.com"
        />
      </label>
      <label className="grid gap-1.5 text-sm">
        <span className="list-tool-form-label">Product name</span>
        <input
          name="tool_name"
          required
          minLength={2}
          maxLength={120}
          className="rounded-2xl border border-[var(--stroke)] bg-white px-4 py-3"
          placeholder="Acme Agent"
        />
      </label>
      <label className="grid gap-1.5 text-sm">
        <span className="list-tool-form-label">Official website</span>
        <input
          name="tool_url"
          type="url"
          required
          maxLength={500}
          className="rounded-2xl border border-[var(--stroke)] bg-white px-4 py-3"
          placeholder="https://example.com"
        />
      </label>
      <label className="grid gap-1.5 text-sm">
        <span className="list-tool-form-label">One-line pitch (optional)</span>
        <textarea
          name="tool_notes"
          rows={3}
          maxLength={2000}
          className="rounded-2xl border border-[var(--stroke)] bg-white px-4 py-3"
          placeholder="What it does, in one sentence a model can quote."
        />
      </label>
      {message ? <p className="list-tool-form-hint text-sm">{message}</p> : null}
      <button
        type="submit"
        className="btn-primary focus-ring inline-flex px-7 py-3 text-sm"
        disabled={status === "loading"}
        data-track-buy="1"
      >
        {status === "loading" ? "Saving…" : `Save details & pay ${FEATURED_PRICE_LABEL}`}
      </button>
      <p className="list-tool-form-hint text-xs leading-relaxed">
        {FEATURED_PRICE_LABEL} USD charged on Stripe after we save these details. Need help?{" "}
        <a className="underline" href={`mailto:${operator.email}`}>
          {operator.email}
        </a>
        .
      </p>
    </form>
  );
}
