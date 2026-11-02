"use client";

import { useState } from "react";

export function SubmitToolForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("loading");
    try {
      const response = await fetch("/api/submit-tool", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(json.message || "Could not submit");
      setStatus("ok");
      setMessage(json.message || "Received. Provider not wired yet.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong");
    }
  }

  const field = "focus-ring w-full rounded-2xl border border-[var(--stroke)] bg-transparent px-4 py-3";

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1 text-sm">
          Product name
          <input name="name" required className={field} />
        </label>
        <label className="grid gap-1 text-sm">
          Website
          <input name="website" type="url" required placeholder="https://" className={field} />
        </label>
      </div>
      <label className="grid gap-1 text-sm">
        Your email
        <input name="email" type="email" required autoComplete="email" className={field} />
      </label>
      <label className="grid gap-1 text-sm">
        Category
        <select name="category" className={field} defaultValue="productivity">
          <option value="coding-agents">Coding agents</option>
          <option value="shopping-agents">Shopping agents</option>
          <option value="education">Education</option>
          <option value="productivity">Productivity</option>
          <option value="research">Research</option>
          <option value="voice">Voice</option>
          <option value="image-video">Image & video</option>
          <option value="agent-frameworks">Agent frameworks & harnesses</option>
        </select>
      </label>
      <label className="grid gap-1 text-sm">
        Short description
        <textarea name="description" required rows={5} className={field} />
      </label>
      <button
        type="submit"
        disabled={status === "loading"}
        className="justify-self-start rounded-full bg-[var(--fg)] px-6 py-3 text-sm font-medium text-[var(--bg)]"
      >
        {status === "loading" ? "Sending…" : "Submit a tool"}
      </button>
      {message ? (
        <p className={`text-sm ${status === "error" ? "text-red-500" : "text-[var(--muted)]"}`} role="status">
          {message}
        </p>
      ) : null}
    </form>
  );
}
