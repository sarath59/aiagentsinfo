import Link from "next/link";

const cards = {
  calculator: {
    href: "/agent-cost-calculator",
    kicker: "Calculator",
    title: "Estimate what this agent costs you",
    body: "A 30-day token bill from official per-token prices. It does not add a seat fee.",
  },
  checker: {
    href: "/agent-prompt-checker",
    kicker: "Prompt checker",
    title: "Check a prompt and its tools",
    body: "Counts tokens and checks tool JSON in the browser. The numbers you type are not saved.",
  },
  picker: {
    href: "/tools/agent-picker",
    kicker: "Picker",
    title: "Which AI agent fits me?",
    body: "Four questions, then three directory listings that match. No login.",
  },
} as const;

export function ToolCtas({ tools }: { tools: (keyof typeof cards)[] }) {
  const items = tools.filter((tool, index) => tools.indexOf(tool) === index);
  if (!items.length) return null;
  return (
    <aside className="mt-12" aria-label="Tools on this site">
      <h2 className="text-2xl font-semibold tracking-tight">Tools for this page</h2>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2">
        {items.map((tool) => {
          const card = cards[tool];
          return (
            <li key={tool} className="glass rounded-3xl p-5">
              <p className="kicker">{card.kicker}</p>
              <h3 className="mt-2 text-lg font-semibold tracking-tight">
                <Link href={card.href} className="text-[var(--fg)]">
                  {card.title}
                </Link>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{card.body}</p>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
