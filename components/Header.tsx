import Link from "next/link";
import { SearchIcon } from "@/components/Icons";
import { Logo } from "@/components/Logo";
import { audiences, nav } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--stroke)] bg-[color-mix(in_oklab,white_86%,var(--bg))] backdrop-blur-2xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5">
        <Link href="/" className="focus-ring rounded-lg" aria-label="AI Agents Info home">
          <Logo />
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-7 text-[13.5px] md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="focus-ring text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
            >
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
                  className="block rounded-xl px-3 py-2 text-sm hover:bg-[color-mix(in_oklab,var(--color-electric)_10%,transparent)]"
                >
                  {audience.title}
                </Link>
              ))}
            </div>
          </details>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/search"
            className="focus-ring btn-ghost inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em]"
          >
            <SearchIcon className="h-3.5 w-3.5 text-[var(--color-cyan)]" />
            Search
          </Link>
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
