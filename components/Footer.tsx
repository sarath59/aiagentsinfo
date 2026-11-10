import Link from "next/link";
import { Logo } from "@/components/Logo";
import { entityLine, footerNav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-[var(--stroke)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-cyan)] to-transparent opacity-50" />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-5">
        <div className="md:col-span-1">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">{entityLine}</p>
        </div>
        {footerNav.map((group) => (
          <div key={group.title}>
            <p className="kicker mb-3">{group.title}</p>
            <ul className="grid gap-2 text-sm">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[var(--muted)] transition-colors hover:text-[var(--fg)]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 pb-10 text-xs text-[var(--muted)] sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}. Independent publication. No fake staff bios.
        </p>
        <p>
          <a href="/rss.xml">RSS</a>
          {" · "}
          <a href="/sitemap.xml">Sitemap</a>
        </p>
      </div>
    </footer>
  );
}
