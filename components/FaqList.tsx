import type { ReactNode } from "react";

export function FaqList({ items }: { items: { question: string; answer: ReactNode }[] }) {
  return (
    <section className="mt-14">
      <h2 className="text-2xl font-semibold tracking-tight">FAQ</h2>
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
