import Link from "next/link";

const items = [
  { href: "/trackers", label: "All trackers" },
  { href: "/trackers/downloads", label: "Downloads" },
  { href: "/trackers/agents-md", label: "AGENTS.md" },
  { href: "/trackers/stars", label: "GitHub stars" },
] as const;

export function TrackerNav({ current }: { current: string }) {
  return (
    <nav aria-label="Live trackers" className="mb-8 flex flex-wrap gap-2">
      {items.map((item) => (
        <Link key={item.href} href={item.href} className={`chip ${item.href === current ? "chip-active" : ""}`}>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
