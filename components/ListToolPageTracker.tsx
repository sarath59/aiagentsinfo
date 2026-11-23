"use client";

import { useEffect } from "react";
import { trackGoal } from "@/lib/analytics";
import {
  LIST_TOOL_BUY_VISIBLE,
  LIST_TOOL_DWELL_15,
  LIST_TOOL_DWELL_30,
  LIST_TOOL_DWELL_60,
  LIST_TOOL_DWELL_120,
  LIST_TOOL_EXIT,
  LIST_TOOL_PAGE_VIEW,
  LIST_TOOL_SCROLL_50,
  LIST_TOOL_SCROLL_90,
  LIST_TOOL_SECTION,
  listToolMeta,
} from "@/lib/analytics/list-tool-goals";

const DWELL = [
  { ms: 15_000, name: LIST_TOOL_DWELL_15, sec: "15" },
  { ms: 30_000, name: LIST_TOOL_DWELL_30, sec: "30" },
  { ms: 60_000, name: LIST_TOOL_DWELL_60, sec: "60" },
  { ms: 120_000, name: LIST_TOOL_DWELL_120, sec: "120" },
] as const;

/**
 * Full-funnel tracking for /list-your-tool:
 * page view, dwell buckets, scroll depth, section views, buy CTA visibility, exit dwell.
 */
export function ListToolPageTracker() {
  useEffect(() => {
    trackGoal(LIST_TOOL_PAGE_VIEW, listToolMeta({ placement: "list_your_tool" }));

    const started = performance.now();
    const fired = new Set<string>();
    const timers: number[] = [];

    for (const step of DWELL) {
      timers.push(
        window.setTimeout(() => {
          if (fired.has(step.name)) return;
          fired.add(step.name);
          trackGoal(step.name, listToolMeta({ dwell_sec: step.sec, placement: "list_your_tool" }));
        }, step.ms),
      );
    }

    function scrollPct() {
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      return Math.min(100, Math.round((window.scrollY / max) * 100));
    }

    function onScroll() {
      const pct = scrollPct();
      if (pct >= 50 && !fired.has(LIST_TOOL_SCROLL_50)) {
        fired.add(LIST_TOOL_SCROLL_50);
        trackGoal(LIST_TOOL_SCROLL_50, listToolMeta({ scroll_pct: "50" }));
      }
      if (pct >= 90 && !fired.has(LIST_TOOL_SCROLL_90)) {
        fired.add(LIST_TOOL_SCROLL_90);
        trackGoal(LIST_TOOL_SCROLL_90, listToolMeta({ scroll_pct: "90" }));
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = entry.target.getAttribute("data-track-section");
          if (!id || fired.has(`section:${id}`)) continue;
          fired.add(`section:${id}`);
          trackGoal(LIST_TOOL_SECTION, listToolMeta({ section: id }));
        }
      },
      { threshold: 0.45 },
    );
    document.querySelectorAll("[data-track-section]").forEach((node) => sectionObserver.observe(node));

    const buyObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || fired.has(LIST_TOOL_BUY_VISIBLE)) continue;
          fired.add(LIST_TOOL_BUY_VISIBLE);
          trackGoal(LIST_TOOL_BUY_VISIBLE, listToolMeta({ cta: "stripe_buy" }));
        }
      },
      { threshold: 0.6 },
    );
    document.querySelectorAll("[data-track-buy]").forEach((node) => buyObserver.observe(node));

    function onExit() {
      const sec = String(Math.round((performance.now() - started) / 1000));
      trackGoal(LIST_TOOL_EXIT, listToolMeta({ dwell_sec: sec, scroll_pct: String(scrollPct()) }));
    }
    window.addEventListener("pagehide", onExit);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") onExit();
    });

    return () => {
      for (const id of timers) window.clearTimeout(id);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pagehide", onExit);
      sectionObserver.disconnect();
      buyObserver.disconnect();
    };
  }, []);

  return null;
}
