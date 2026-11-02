import Link from "next/link";

export function EmptyState({
  title,
  body,
  href,
  cta,
}: {
  title: string;
  body: string;
  href?: string;
  cta?: string;
}) {
  return (
    <div className="glass relative overflow-hidden rounded-3xl px-6 py-14 text-center sm:px-10">
      <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-cyan)] to-[var(--gold-bright)] opacity-80" />
      <p className="kicker kicker-lead">Nothing published yet</p>
      <h2 className="display mt-4 text-3xl sm:text-4xl">{title}</h2>
      <p className="mx-auto mt-4 max-w-md text-[var(--muted)]">{body}</p>
      {href && cta ? (
        <Link href={href} className="btn-primary mt-8 inline-flex px-5 py-2 text-sm">
          {cta}
        </Link>
      ) : null}
    </div>
  );
}
