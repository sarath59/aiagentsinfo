"use client";

import { useState } from "react";
import { trackGoal } from "@/lib/analytics";

export function WeeklySignup() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = String(new FormData(form).get("email") || "");
    setStatus("loading");
    setMessage("");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, audience: "new-agents-week", company: "" }),
      });
      const json = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(json.message || "Could not subscribe");
      setStatus("ok");
      setMessage(json.message || "Check your email to confirm.");
      trackGoal("newsletter_signup");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong");
    }
  }

  return (
    <section className="glass mt-10 rounded-3xl p-6" aria-labelledby="weekly-agents-title">
      <p className="kicker">Newsletter</p>
      <h2 id="weekly-agents-title" className="mt-2 text-2xl font-semibold tracking-tight">
        New AI agents this week
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
        Email only. This joins the existing weekly Kit list: directory additions and the agent notes already sent from
        this site. Kit receives the address. This site does not keep a copy.
      </p>
      <form onSubmit={onSubmit} className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]">
        <label className="sr-only" htmlFor="weekly-agents-email">
          Email
        </label>
        <input
          id="weekly-agents-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Email address"
          className="focus-ring w-full rounded-full border border-[var(--stroke)] bg-white px-4 py-3"
        />
        <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
        <button type="submit" disabled={status === "loading"} className="btn-primary px-5 py-3 text-sm disabled:opacity-60">
          {status === "loading" ? "Sending…" : "Email me the week"}
        </button>
        {message ? (
          <p className={`sm:col-span-2 text-sm ${status === "error" ? "text-red-700" : "text-[var(--muted)]"}`} role="status">
            {message}
          </p>
        ) : null}
      </form>
    </section>
  );
}
