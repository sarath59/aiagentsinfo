"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackGoal } from "@/lib/analytics";

/**
 * Fires report_read_50 and report_read_complete once per page view,
 * when 50% and 90% of a /reports/<slug> page has been scrolled into view.
 */
export function ReportReadTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const match = pathname.match(/^\/reports\/([a-z0-9_-]+)\/?$/);
    if (!match) return;
    const metadata = { report_slug: match[1] };
    let half = false;
    let done = false;

    function depth() {
      const el = document.scrollingElement ?? document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      if (max <= 1) return 1;
      return Math.min(1, el.scrollTop / max);
    }

    function check() {
      const seen = depth();
      if (!half && seen >= 0.5) {
        half = true;
        trackGoal("report_read_50", metadata);
      }
      if (!done && seen >= 0.9) {
        done = true;
        trackGoal("report_read_complete", metadata);
      }
      if (half && done) {
        window.removeEventListener("scroll", check);
        window.removeEventListener("resize", check);
      }
    }

    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [pathname]);

  return null;
}
