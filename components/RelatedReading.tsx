import type { ReactNode } from "react";

/** Related reading block wrapper (no visitor tracking). */
export function RelatedReading({ children }: { children: ReactNode }) {
  return (
    <section className="article-related" aria-labelledby="related-heading">
      {children}
    </section>
  );
}
