import Link from "next/link";
import type { FollowupCard } from "@/lib/founder-followup";

export function FounderReading({ posts }: { posts: FollowupCard[] }) {
  if (!posts.length) return null;
  return (
    <section className="mt-8" aria-labelledby="founder-reading-heading">
      <h2 id="founder-reading-heading" className="text-lg font-semibold tracking-tight">
        Founder reading
      </h2>
      <p className="mt-1 text-sm text-[var(--muted)]">
        Guides on this site about how assistants find tools, how agents work, and how a harness is evaluated.
      </p>
      <ul className="mt-4 grid gap-3">
        {posts.map((post) => (
          <li key={post.href} className="rounded-2xl border border-[var(--stroke)] bg-white px-4 py-4">
            <p className="kicker">{post.kicker}</p>
            <Link href={post.href} className="mt-1 inline-block font-semibold text-[var(--fg)]">
              {post.title}
            </Link>
            <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">{post.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function FreeToolsStrip({ tools }: { tools: FollowupCard[] }) {
  if (!tools.length) return null;
  return (
    <aside className="mt-8" aria-label="Try our free tools">
      <h2 className="text-lg font-semibold tracking-tight">Try our free tools</h2>
      <p className="mt-1 text-sm text-[var(--muted)]">No login. Nothing you paste is stored.</p>
      <ul className="mt-4 grid gap-3 sm:grid-cols-3">
        {tools.map((tool) => (
          <li key={tool.href} className="rounded-2xl border border-[var(--stroke)] bg-white px-4 py-4">
            <p className="kicker">{tool.kicker}</p>
            <Link href={tool.href} className="mt-1 inline-block font-semibold text-[var(--fg)]">
              {tool.title}
            </Link>
            <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">{tool.description}</p>
          </li>
        ))}
      </ul>
    </aside>
  );
}
