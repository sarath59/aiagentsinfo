import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This URL is not a page on AI Agents Info.",
  openGraph: {
    title: "Page not found · AI Agents Info",
    description: "This URL is not a page on AI Agents Info.",
  },
  twitter: {
    title: "Page not found · AI Agents Info",
    description: "This URL is not a page on AI Agents Info.",
  },
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div>
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <p className="kicker">404</p>
        <h1 className="display mt-4 text-5xl">This page is not in the corpus</h1>
        <p className="mt-4 text-[var(--muted)]">
          The URL does not match a blog post, paper, glossary term, or directory listing. Nothing is behind a login — it simply is not here.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary px-5 py-2 text-sm">
            Home
          </Link>
          <Link href="/directory" className="btn-ghost px-5 py-2 text-sm">
            Directory
          </Link>
          <Link href="/research" className="btn-ghost px-5 py-2 text-sm">
            Research
          </Link>
          <Link href="/search" className="btn-ghost px-5 py-2 text-sm">
            Search
          </Link>
        </div>
      </div>
    </div>
  );
}
