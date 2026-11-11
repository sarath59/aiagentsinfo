"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { trackGoal } from "@/lib/analytics";

function pageSlug(pathname: string) {
  return pathname.split("?")[0].split("#")[0].replace(/^\/+|\/+$/g, "");
}

function anchorFromClick(event: MouseEvent): HTMLAnchorElement | null {
  for (const node of event.composedPath()) {
    if (node instanceof HTMLAnchorElement) return node;
  }
  const target = event.target;
  if (!(target instanceof Element)) return null;
  const direct = target.closest("a");
  if (direct instanceof HTMLAnchorElement) return direct;
  const stretch = target.closest(".click-card")?.querySelector("a.card-stretch");
  return stretch instanceof HTMLAnchorElement ? stretch : null;
}

/** Click tracking for the Related reading block. Capture phase runs before navigation. */
export function RelatedReading({ children }: { children: ReactNode }) {
  const fromSlug = pageSlug(usePathname() || "");
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || !fromSlug) return;

    function onClick(event: MouseEvent) {
      const anchor = anchorFromClick(event);
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
    }

    root.addEventListener("click", onClick, true);
    return () => root.removeEventListener("click", onClick, true);
  }, [fromSlug]);

  return (
    <section ref={ref} className="article-related" aria-labelledby="related-heading">
      {children}
    </section>
  );
}
