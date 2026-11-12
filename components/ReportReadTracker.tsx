"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackGoal } from "@/lib/analytics";

/**
 * On every /reports/<slug> page: report_view once per visit.
 * report_read_50 and report_read_complete wait for real reading of the
 * article column (not the whole document):
 * - 50% of that column in view, and 15 seconds on the page
 * - about 90% of that column, and 45 seconds on the page
 * A tall viewport, hydration, or a restored scroll position does not count.
 * A column shorter than the viewport can qualify only after the time has
 * passed while that point is actually on screen.
 * The index at /reports is skipped.
 */
const REPORT_PATH = /^\/reports\/([a-z0-9_-]+)\/?$/;
const HALF_MS = 15_000;
const DONE_MS = 45_000;
const ARM_MS = 500;

const sentReads = new Set<string>();
const visits = { path: "", id: 0, at: 0 };

function openVisit(pathname: string) {
  const now = Date.now();
  if (visits.path === pathname && now - visits.at < 1000) {
    visits.at = now;
    return { id: visits.id, fresh: false };
  }
  visits.path = pathname;
  visits.id += 1;
  visits.at = now;
  return { id: visits.id, fresh: true };
}

function viewportHeight() {
  return window.innerHeight || document.documentElement.clientHeight || 0;
}

function scrollTop() {
  return document.scrollingElement?.scrollTop ?? window.scrollY ?? 0;
}

function articleBody() {
  const article = document.querySelector("article.report-shell");
  if (!(article instanceof HTMLElement)) return null;
  const column = article.querySelector(".article-column");
  return column instanceof HTMLElement ? column : article;
}

export function ReportReadTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const match = pathname.match(REPORT_PATH);
    if (!match) return;
    const metadata = { report_slug: match[1] };
    const visit = openVisit(pathname);
    if (visit.fresh) trackGoal("report_view", metadata);

    let cancelled = false;
    let armed = false;
    let userScrolled = false;
    let reached50 = false;
    let reached90 = false;
    let fired50 = false;
    let fired90 = false;
    let baseline = scrollTop();
    let start = performance.now();
    let frame = 0;
    let attempts = 0;
    let armTimer = 0;
    let timer50 = 0;
    let timer90 = 0;
    let observer: IntersectionObserver | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let sentinel50: HTMLElement | null = null;
    let sentinel90: HTMLElement | null = null;
    let body: HTMLElement | null = null;
    let patchedPosition = false;

    function clearTimers() {
      window.clearTimeout(armTimer);
      window.clearTimeout(timer50);
      window.clearTimeout(timer90);
      armTimer = 0;
      timer50 = 0;
      timer90 = 0;
    }

    function shorterThanViewport() {
      if (!body) return false;
      return body.getBoundingClientRect().height <= viewportHeight() + 1;
    }

    function point(node: HTMLElement | null, mode: "visible" | "reached") {
      if (!node) return false;
      const rect = node.getBoundingClientRect();
      const height = viewportHeight();
      if (height <= 0) return false;
      if (mode === "visible") return rect.bottom > 0 && rect.top < height;
      return rect.top <= height;
    }

    function latch() {
      if (!armed || !userScrolled || shorterThanViewport()) return;
      if (point(sentinel50, "reached")) reached50 = true;
      if (point(sentinel90, "reached")) reached90 = true;
    }

    function eligible(mark: "50" | "90") {
      const node = mark === "50" ? sentinel50 : sentinel90;
      if (shorterThanViewport()) return point(node, "visible");
      return mark === "50" ? reached50 : reached90;
    }

    function emit(name: "report_read_50" | "report_read_complete") {
      const key = `${visit.id}:${name}`;
      if (sentReads.has(key)) return;
      sentReads.add(key);
      trackGoal(name, metadata);
    }

    function schedule() {
      if (cancelled || !sentinel50 || !sentinel90) return;
      window.clearTimeout(timer50);
      window.clearTimeout(timer90);
      const elapsed = performance.now() - start;
      if (!fired50 && eligible("50")) {
        timer50 = window.setTimeout(evaluate, Math.max(0, HALF_MS - elapsed));
      }
      if (!fired90 && eligible("90")) {
        timer90 = window.setTimeout(evaluate, Math.max(0, DONE_MS - elapsed));
      }
    }

    function evaluate() {
      if (cancelled) return;
      const elapsed = performance.now() - start;
      if (!fired50 && elapsed >= HALF_MS && eligible("50")) {
        fired50 = true;
        emit("report_read_50");
      }
      if (!fired90 && elapsed >= DONE_MS && eligible("90")) {
        fired90 = true;
        emit("report_read_complete");
      }
      if (!fired50 || !fired90) schedule();
    }

    function onScroll() {
      if (cancelled) return;
      if (!armed) {
        baseline = scrollTop();
        return;
      }
      if (Math.abs(scrollTop() - baseline) < 2) return;
      userScrolled = true;
      latch();
      schedule();
    }

    function onResize() {
      if (cancelled) return;
      latch();
      schedule();
    }

    function onPageShow(event: Event) {
      if (cancelled || !("persisted" in event) || !event.persisted) return;
      start = performance.now();
      armed = false;
      userScrolled = false;
      reached50 = false;
      reached90 = false;
      baseline = scrollTop();
      window.clearTimeout(armTimer);
      armTimer = window.setTimeout(() => {
        if (cancelled) return;
        baseline = scrollTop();
        armed = true;
        schedule();
      }, ARM_MS);
      schedule();
    }

    function placeSentinels(target: HTMLElement) {
      if (getComputedStyle(target).position === "static") {
        patchedPosition = true;
        target.style.position = "relative";
      }
      function mark(which: "50" | "90", top: string) {
        const node = document.createElement("span");
        node.dataset.readSentinel = which;
        node.setAttribute("aria-hidden", "true");
        node.style.position = "absolute";
        node.style.left = "0";
        node.style.top = top;
        node.style.width = "1px";
        node.style.height = "1px";
        node.style.pointerEvents = "none";
        target.appendChild(node);
        return node;
      }
      sentinel50 = mark("50", "50%");
      sentinel90 = mark("90", "90%");
      if (typeof IntersectionObserver !== "undefined") {
        observer = new IntersectionObserver(
          () => {
            if (cancelled) return;
            latch();
            schedule();
          },
          { threshold: 0 },
        );
        observer.observe(sentinel50);
        observer.observe(sentinel90);
      }
      if (typeof ResizeObserver !== "undefined") {
        resizeObserver = new ResizeObserver(() => {
          if (cancelled) return;
          latch();
          schedule();
        });
        resizeObserver.observe(target);
      }
    }

    function boot() {
      if (cancelled) return;
      const target = articleBody();
      if (!target) {
        if (attempts < 20) {
          attempts += 1;
          frame = window.requestAnimationFrame(boot);
        }
        return;
      }
      body = target;
      placeSentinels(target);
      baseline = scrollTop();
      armTimer = window.setTimeout(() => {
        if (cancelled) return;
        baseline = scrollTop();
        armed = true;
        schedule();
      }, ARM_MS);
      schedule();
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("pageshow", onPageShow);
    boot();

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
      clearTimers();
      observer?.disconnect();
      resizeObserver?.disconnect();
      sentinel50?.remove();
      sentinel90?.remove();
      if (patchedPosition && body) body.style.position = "";
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, [pathname]);

  return null;
}
