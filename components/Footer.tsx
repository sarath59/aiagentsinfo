import Link from "next/link";
import { Logo } from "@/components/Logo";
import { footerLegal, footerLine, footerNav, site } from "@/lib/site";

const columnTitle = "kicker mb-4";
const columnLink =
  "text-sm text-[var(--muted)] transition-colors duration-150 hover:text-[var(--fg)] focus-ring";

export function Footer() {
  return (
    <footer className="site-footer relative">
      <div className="mx-auto max-w-6xl px-4 pb-10 pt-16">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4 lg:gap-x-10">
          <div className="col-span-2 min-w-0 lg:col-span-1">
            <Link href="/" className="inline-flex rounded-sm focus-ring" aria-label="AI Agents Info home">
              <Logo variant="reversed" />
            </Link>
            <p className="site-footer-tagline mt-6 max-w-xs">{footerLine}</p>
          </div>
          {footerNav.map((group) => (
            <nav key={group.title} aria-label={group.title} className="min-w-0">
              <p className={columnTitle}>{group.title}</p>
              <ul className="grid gap-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={columnLink}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-[var(--stroke)] pt-6 text-xs text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name} · Independent research lab and AI agent directory
          </p>
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {footerLegal.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors duration-150 hover:text-[var(--fg)] focus-ring">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
