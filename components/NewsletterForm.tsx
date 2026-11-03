"use client";

import { useState } from "react";

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("loading");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.get("email"),
          audience: data.get("audience"),
        }),
      });
      const json = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(json.message || "Could not subscribe");
      setStatus("ok");
      setMessage(json.message || "Thanks. You have not been added to a list.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong");
    }
  }

  return (
    <form onSubmit={onSubmit} className={compact ? "grid gap-3" : "grid gap-3 sm:grid-cols-[1fr_auto]"}>
      <label className="sr-only" htmlFor="newsletter-email">
        Email
      </label>
      <input
        id="newsletter-email"
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder="Email address"
        className="focus-ring w-full rounded-full border border-[var(--stroke)] bg-transparent px-4 py-3"
      />
      <input type="hidden" name="audience" value="everyone" />
      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary px-5 py-3 text-sm disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Get the digest"}
      </button>
      {message ? (
        <p className={`sm:col-span-2 text-sm ${status === "error" ? "text-red-700" : "text-[var(--muted)]"}`} role="status">
          {message}
        </p>
      ) : null}
    </form>
  );
}
