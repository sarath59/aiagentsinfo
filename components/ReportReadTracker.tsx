"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackGoal } from "@/lib/analytics";

/**
 * On every /reports/<slug> page: report_view once on load, then
 * report_read_50 and report_read_complete once each, when the reader has
 * reached 50% and 90% of the report article. The index at /reports is skipped.
 */
const REPORT_PATH = /^\/reports\/([a-z0-9_-]+)\/?$/;

function reportDepth() {
  const article = document.querySelector("article.report-shell");
  const scroller = document.scrollingElement ?? document.documentElement;
  if (article instanceof HTMLElement && article.offsetHeight >= 80) {
    const top = article.getBoundingClientRect().top + scroller.scrollTop;
    const seen = scroller.scrollTop + scroller.clientHeight - top;
    return Math.min(1, Math.max(0, seen / article.offsetHeight));
  }
  const max = scroller.scrollHeight - scroller.clientHeight;
  if (max <= 1) return 0;
  return Math.min(1, Math.max(0, scroller.scrollTop / max));
}

export function ReportReadTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const match = pathname.match(REPORT_PATH);
    if (!match) return;
    const metadata = { report_slug: match[1] };
    trackGoal("report_view", metadata);

    let half = false;
    let done = false;
    let observer: ResizeObserver | null = null;

    function detach() {
      window.removeEventListener("scroll", check);
      document.removeEventListener("scroll", check, true);
      window.removeEventListener("resize", check);
      observer?.disconnect();
    }

    function check() {
      const seen = reportDepth();
      if (!half && seen >= 0.5) {
        half = true;
        trackGoal("report_read_50", metadata);
      }
      if (!done && seen >= 0.9) {
        done = true;
        trackGoal("report_read_complete", metadata);
      }
      if (half && done) detach();
    }

    const article = document.querySelector("article.report-shell");
    if (article instanceof HTMLElement && typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(() => check());
      observer.observe(article);
    }

    check();
    window.addEventListener("scroll", check, { passive: true });
    document.addEventListener("scroll", check, { passive: true, capture: true });
    window.addEventListener("resize", check);
    return detach;
  }, [pathname]);

  return null;
}
