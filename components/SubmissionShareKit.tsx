"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { announcementPosts } from "@/lib/announcement-posts";
import { renderAnnouncementPng } from "@/components/announcement-canvas";
import "./submission-share.css";

const RIBBONS = [
  { top: "7%", tilt: "-8deg", color: "#0B1F33", delay: "0s", height: 16 },
  { top: "18%", tilt: "-5deg", color: "#0C5CAD", delay: "0.06s", height: 12 },
  { top: "31%", tilt: "4deg", color: "#2F9DFF", delay: "0.02s", height: 10 },
  { top: "44%", tilt: "-3deg", color: "#14B8A6", delay: "0.1s", height: 14 },
  { top: "58%", tilt: "6deg", color: "#E0B04A", delay: "0.04s", height: 12 },
  { top: "72%", tilt: "-6deg", color: "#0C5CAD", delay: "0.14s", height: 18 },
  { top: "86%", tilt: "3deg", color: "#0B1F33", delay: "0.08s", height: 11 },
];

const BITS = [
  { top: "20%", left: "18%", color: "#E0B04A", delay: "0.12s", tilt: "16deg" },
  { top: "36%", left: "64%", color: "#2F9DFF", delay: "0.18s", tilt: "-12deg" },
  { top: "52%", left: "28%", color: "#14B8A6", delay: "0.08s", tilt: "8deg" },
  { top: "24%", left: "78%", color: "#0B1F33", delay: "0.2s", tilt: "20deg" },
  { top: "68%", left: "48%", color: "#E0B04A", delay: "0.16s", tilt: "-8deg" },
];

const fieldClass =
  "focus-ring w-full rounded-2xl border border-[var(--stroke)] bg-white px-4 py-3 text-sm text-[var(--fg)]";

export type ShareListing = {
  name: string;
  tagline: string;
  url: string;
};

export function SubmissionShareKit({
  message,
  share,
  onAnother,
}: {
  message: string;
  share: ShareListing;
  onAnother: () => void;
}) {
  const posts = announcementPosts(share);
  const [ribbons, setRibbons] = useState(true);
  const [copied, setCopied] = useState<"url" | "x" | "linkedin" | null>(null);
  const [preview, setPreview] = useState("");
  const [blob, setBlob] = useState<Blob | null>(null);
  const [imageError, setImageError] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => setRibbons(false), 2600);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    let url = "";
    let cancelled = false;
    renderAnnouncementPng(share)
      .then((next) => {
        if (cancelled) return;
        url = URL.createObjectURL(next);
        setBlob(next);
        setPreview(url);
      })
      .catch(() => {
        if (!cancelled) setImageError("The announcement image could not be prepared in this browser.");
      });
    return () => {
      cancelled = true;
      if (url) URL.revokeObjectURL(url);
    };
  }, [share]);

  async function copy(text: string, key: "url" | "x" | "linkedin") {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const area = document.createElement("textarea");
      area.value = text;
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
    setCopied(key);
    window.setTimeout(() => setCopied((current) => (current === key ? null : current)), 2000);
  }

  function download() {
    if (!blob) return;
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = announcementFileName(share.url);
    link.click();
    URL.revokeObjectURL(href);
  }

  return (
    <>
      {ribbons ? (
        <div className="submit-ribbons" aria-hidden="true">
          {RIBBONS.map((ribbon) => (
            <span
              key={`${ribbon.top}-${ribbon.delay}`}
              className="submit-ribbon"
              style={
                {
                  top: ribbon.top,
                  height: ribbon.height,
                  background: ribbon.color,
                  "--tilt": ribbon.tilt,
                  "--delay": ribbon.delay,
                } as CSSProperties
              }
            />
          ))}
          {BITS.map((bit) => (
            <span
              key={`${bit.top}-${bit.left}`}
              className="submit-ribbon-bit"
              style={
                {
                  top: bit.top,
                  left: bit.left,
                  background: bit.color,
                  "--tilt": bit.tilt,
                  "--delay": bit.delay,
                } as CSSProperties
              }
            />
          ))}
        </div>
      ) : null}
      <div className="glass rounded-3xl p-6" role="status">
        <p className="kicker">Listed</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight" tabIndex={-1}>
          {share.name} is now listed
        </h2>
        <p className="mt-3 text-lg leading-relaxed">{message}</p>

        <div className="mt-6 grid gap-2">
          <label className="text-sm font-medium" htmlFor="listing-url">
            Listing link
          </label>
          <div className="flex flex-col gap-2 sm:flex-row">
            <input id="listing-url" readOnly value={share.url} className={fieldClass} onFocus={(event) => event.currentTarget.select()} />
            <button type="button" className="btn-ghost shrink-0 px-4 py-3 text-sm" onClick={() => copy(share.url, "url")}>
              {copied === "url" ? "Copied" : "Copy link"}
            </button>
          </div>
          <a className="text-sm text-[var(--link)] underline" href={share.url}>
            Open the listing
          </a>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold tracking-tight">Announcement image</h3>
          <p className="mt-1 text-sm text-[var(--muted)]">A PNG for a social post, with your tool name on it.</p>
          {preview ? (
            // The PNG is drawn in the browser for this submission. It is not a remote file.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={preview}
              alt={`${share.name} is now listed on AI Agents Info`}
              className="mt-4 w-full rounded-2xl border border-[var(--stroke)]"
            />
          ) : null}
          {imageError ? <p className="mt-3 text-sm text-red-800">{imageError}</p> : null}
          <button
            type="button"
            className="btn-primary mt-4 px-5 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-60"
            onClick={download}
            disabled={!blob}
          >
            Download announcement image
          </button>
        </div>

        <PostBlock
          id="post-x"
          title="Post on X"
          text={posts.x}
          copied={copied === "x"}
          onCopy={() => copy(posts.x, "x")}
        />
        <PostBlock
          id="post-linkedin"
          title="Post on LinkedIn"
          text={posts.linkedin}
          copied={copied === "linkedin"}
          onCopy={() => copy(posts.linkedin, "linkedin")}
        />

        <button type="button" className="btn-ghost mt-8 px-4 py-2 text-sm" onClick={onAnother}>
          Submit another
        </button>
      </div>
    </>
  );
}

function PostBlock({
  id,
  title,
  text,
  copied,
  onCopy,
}: {
  id: string;
  title: string;
  text: string;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold tracking-tight" id={`${id}-label`}>
          {title}
        </h3>
        <button type="button" className="btn-ghost px-4 py-2 text-sm" onClick={onCopy} aria-describedby={`${id}-label`}>
          {copied ? "Copied" : "Copy post"}
        </button>
      </div>
      <textarea id={id} readOnly rows={6} value={text} className={`${fieldClass} mt-3`} onFocus={(event) => event.currentTarget.select()} />
    </div>
  );
}

function announcementFileName(url: string) {
  try {
    const slug = new URL(url).pathname.split("/").filter(Boolean).pop() || "listing";
    return `${slug}-listed-on-ai-agents-info.png`;
  } catch {
    return "listed-on-ai-agents-info.png";
  }
}
