import Link from "next/link";
import { footerNav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-[var(--stroke)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-5">
        <div className="md:col-span-1">
          <p className="font-serif text-2xl">{site.name}</p>
          <p className="mt-3 text-sm text-[var(--muted)]">{site.tagline}</p>
        </div>
        {footerNav.map((group) => (
          <div key={group.title}>
            <p className="kicker mb-3">{group.title}</p>
            <ul className="grid gap-2 text-sm">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[var(--muted)] hover:text-[var(--fg)]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 pb-10 text-xs text-[var(--muted)] sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} {site.name}. Independent publication. No fake staff bios.</p>
        <p>
          <Link href="/rss.xml">RSS</Link>
          {" · "}
          <Link href="/sitemap.xml">Sitemap</Link>
        </p>
      </div>
    </footer>
  );
}
