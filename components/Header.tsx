import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { audiences, nav, site } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--stroke)] bg-[color-mix(in_oklab,var(--bg)_78%,transparent)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="focus-ring group flex items-center gap-2">
          <span
            aria-hidden
            className="grid h-8 w-8 place-items-center rounded-full bg-[var(--fg)] text-[10px] font-semibold tracking-[0.2em] text-[var(--bg)]"
          >
            AI
          </span>
          <span className="font-serif text-lg tracking-tight">{site.name}</span>
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-6 text-sm md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="focus-ring text-[var(--muted)] hover:text-[var(--fg)]">
              {item.label}
            </Link>
          ))}
          <details className="relative">
            <summary className="focus-ring cursor-pointer list-none text-[var(--muted)] hover:text-[var(--fg)]">
              Audiences
            </summary>
            <div className="glass absolute right-0 mt-3 w-56 rounded-2xl p-2">
              {audiences.map((audience) => (
                <Link
                  key={audience.slug}
                  href={audience.href}
                  className="block rounded-xl px-3 py-2 text-sm hover:bg-[color-mix(in_oklab,var(--fg)_6%,transparent)]"
                >
                  {audience.title}
                </Link>
              ))}
            </div>
          </details>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/search" className="focus-ring rounded-full border border-[var(--stroke)] px-3 py-1.5 text-xs uppercase tracking-wide">
            Search
          </Link>
          <ThemeToggle />
        </div>
      </div>
      <nav aria-label="Mobile" className="flex gap-4 overflow-x-auto px-4 pb-3 text-sm md:hidden">
        {nav.map((item) => (
          <Link key={item.href} href={item.href} className="whitespace-nowrap text-[var(--muted)]">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
