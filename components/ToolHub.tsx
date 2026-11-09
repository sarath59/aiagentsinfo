import Link from "next/link";

const links = [
  {
    href: "/agent-cost-calculator",
    title: "AI agent cost calculator",
    body: "30-day token bill for the models with an official price on this site.",
  },
  {
    href: "/tools/cursor-vs-claude-code-vs-codex-pricing",
    title: "Cursor vs Claude Code vs Codex pricing calculator",
    body: "Seat prices read November 9, 2026, plus the same token calculator.",
  },
  {
    href: "/trackers/downloads",
    title: "AI agent framework downloads tracker",
    body: "PyPI and npm file requests, refreshed daily. A download is not a user.",
  },
  {
    href: "/best/ai-agent-frameworks",
    title: "AI agent framework comparison table",
    body: "19 free and open-source frameworks. Sortable. Releases read November 9, 2026.",
  },
  {
    href: "/tools/agent-picker",
    title: "Which AI agent fits me?",
    body: "Four questions and three directory links. No login.",
  },
];

export function ToolHub() {
  return (
    <section className="mt-10" aria-labelledby="tool-hub-heading">
      <h2 id="tool-hub-heading" className="text-2xl font-semibold tracking-tight">
        Tools
      </h2>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="glass block h-full rounded-3xl p-5">
              <span className="font-semibold">{link.title}</span>
              <span className="mt-2 block text-sm leading-relaxed text-[var(--muted)]">{link.body}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
