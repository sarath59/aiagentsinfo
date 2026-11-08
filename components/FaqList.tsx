import type { ReactNode } from "react";

export function FaqList({
  items,
  id = "faq",
  heading = "FAQ",
  lead,
}: {
  items: { question: string; answer: ReactNode }[];
  id?: string;
  heading?: string;
  lead?: string;
}) {
  return (
    <section className="article-prose mt-14" id={id}>
      <h2>{heading}</h2>
      {lead ? <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{lead}</p> : null}
      <div className="mt-4 grid gap-6">
        {items.map((item) => (
          <div key={item.question}>
            <h3 className="text-xl font-semibold tracking-tight">{item.question}</h3>
            <div className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{item.answer}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
