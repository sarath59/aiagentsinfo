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
    <div className="glass rounded-3xl px-6 py-12 text-center">
      <p className="kicker">Nothing here yet</p>
      <h2 className="mt-3 font-serif text-3xl">{title}</h2>
      <p className="mx-auto mt-3 max-w-md text-[var(--muted)]">{body}</p>
      {href && cta ? (
        <Link href={href} className="mt-6 inline-flex rounded-full bg-[var(--fg)] px-5 py-2 text-sm text-[var(--bg)]">
          {cta}
        </Link>
      ) : null}
    </div>
  );
}
