import Link from "next/link";

const desks = [
  { href: "/blog", label: "Blog" },
  { href: "/research", label: "Research" },
  { href: "/papers", label: "Papers" },
  { href: "/reports", label: "Reports" },
  { href: "/trackers", label: "Trackers" },
] as const;

export function ContentDeskNav({ current }: { current: (typeof desks)[number]["href"] }) {
  return (
    <nav aria-label="Content desks" className="mb-8 flex flex-wrap gap-2">
      {desks.map((item) => (
        <Link key={item.href} href={item.href} className={`chip ${item.href === current ? "chip-active" : ""}`}>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
