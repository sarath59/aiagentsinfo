"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { trackGoal } from "@/lib/analytics";

function pageSlug(pathname: string) {
  return pathname.split("?")[0].split("#")[0].replace(/^\/+|\/+$/g, "");
}

/** Click tracking for the Related reading block. The heading and cards stay as passed in. */
export function RelatedReading({ children }: { children: ReactNode }) {
  const fromSlug = pageSlug(usePathname() || "");

  return (
    <section
      className="article-related"
      aria-labelledby="related-heading"
      onClick={(event) => {
        if (!fromSlug) return;
        const target = event.target;
        if (!(target instanceof Element)) return;
        const anchor = target.closest("a");
        if (!anchor || anchor.classList.contains("content-card-download")) return;
        const href = anchor.getAttribute("href");
        if (!href || href.startsWith("#")) return;
        let toSlug = "";
        try {
          const url = new URL(href, window.location.origin);
          if (url.origin !== window.location.origin) return;
          if (/\/(pdf|csv)\/?$/.test(url.pathname)) return;
          toSlug = pageSlug(url.pathname);
        } catch {
          return;
        }
        if (!toSlug) return;
        trackGoal("related_click", { from_slug: fromSlug, to_slug: toSlug });
      }}
    >
      {children}
    </section>
  );
}
