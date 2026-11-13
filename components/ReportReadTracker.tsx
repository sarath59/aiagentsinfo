"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackGoal } from "@/lib/analytics";
import {
  columnReadFraction,
  columnShorterThanViewport,
  pageSlug,
  relatedClickMetadata,
  reportSlugFromPath,
  shouldEmitRelatedClick,
  type ClickDedupe,
} from "@/lib/report-reading";

/**
 * On every /reports/<slug> page: report_view once per visit.
 * report_read_50 and report_read_complete wait for real reading of the
 * article column (not the whole document):
 * - 50% of that column in view, and 15 seconds on the page
 * - about 90% of that column, and 45 seconds on the page
 * Engagement is a wheel, a touch, a keyboard scroll, or a pointer.
 * A restored scroll position, which fires scroll without one of those, does not count.
 * A column shorter than the viewport can qualify on time alone while the mark is on screen.
 * The index at /reports is skipped.
 *
 * related_click fires for the Related reading cards and for in-article Next read links,
 * with report_slug set from the path.
 */
const HALF_MS = 15_000;
const DONE_MS = 45_000;
const ARM_MS = 500;

const sentReads = new Set<string>();
const visits = { path: "", id: 0, at: 0 };
let clickState: ClickDedupe = { key: "", at: 0 };

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

function articleColumn() {
  const article = document.querySelector("article.report-shell");
  if (!(article instanceof HTMLElement)) return null;
  const marked = article.querySelector("[data-read-track='column']");
  if (marked instanceof HTMLElement) return marked;
  const column = article.querySelector(".article-column");
  return column instanceof HTMLElement ? column : article;
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

function relatedZone(event: MouseEvent) {
  for (const node of event.composedPath()) {
    if (node instanceof Element && node.closest(".article-related, .next-read")) {
      return node.closest(".article-related, .next-read");
    }
  }
  const target = event.target;
  if (!(target instanceof Element)) return null;
  return target.closest(".article-related, .next-read");
}

const SCROLL_KEYS = new Set([
  "ArrowDown",
  "ArrowUp",
  "PageDown",
  "PageUp",
  "Home",
  "End",
  " ",
  "Spacebar",
]);

export function ReportReadTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const match = pathname.match(/^\/reports\/([a-z0-9_-]+)\/?$/);
    const slug = reportSlugFromPath(pathname);
    if (!match || !slug) return;
    const metadata = { report_slug: slug };
    const visit = openVisit(pathname);
    if (visit.fresh) trackGoal("report_view", metadata);

    let cancelled = false;
    let engaged = false;
    let fired50 = false;
    let fired90 = false;
    let start = performance.now();
    let frame = 0;
    let armTimer = 0;
    let timer50 = 0;
    let timer90 = 0;
    let watchTimer = 0;
    let body: HTMLElement | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let mutationObserver: MutationObserver | null = null;

    function clearTimers() {
      window.clearTimeout(armTimer);
      window.clearTimeout(timer50);
      window.clearTimeout(timer90);
      window.clearTimeout(watchTimer);
      armTimer = 0;
      timer50 = 0;
      timer90 = 0;
      watchTimer = 0;
    }

    function fraction() {
      if (!body) return 0;
      const rect = body.getBoundingClientRect();
      return columnReadFraction(rect.top, rect.height, viewportHeight());
    }

    function shorter() {
      if (!body) return false;
      return columnShorterThanViewport(body.getBoundingClientRect().height, viewportHeight());
    }

    function eligible(mark: "50" | "90") {
      const need = mark === "50" ? 0.5 : 0.9;
      if (fraction() + 1e-9 < need) return false;
      if (shorter()) return true;
      return engaged;
    }

    function emit(name: "report_read_50" | "report_read_complete") {
      const key = `${visit.id}:${name}`;
      if (sentReads.has(key)) return;
      sentReads.add(key);
      trackGoal(name, metadata);
    }

    function schedule() {
      if (cancelled || !body) return;
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

    function markEngaged() {
      if (cancelled || engaged) {
        schedule();
        return;
      }
      engaged = true;
      schedule();
    }

    function onWheel() {
      markEngaged();
    }

    function onTouch() {
      markEngaged();
    }

    function onKey(event: KeyboardEvent) {
      if (!SCROLL_KEYS.has(event.key)) return;
      markEngaged();
    }

    function onPointer() {
      markEngaged();
    }

    function onScroll() {
      schedule();
    }

    function onClick(event: MouseEvent) {
      if (!relatedZone(event)) return;
      const anchor = anchorFromClick(event);
      if (!anchor || anchor.classList.contains("content-card-download")) return;
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#")) return;
      let toPath = "";
      try {
        const url = new URL(href, window.location.origin);
        if (url.origin !== window.location.origin) return;
        if (/\/(pdf|csv)\/?$/.test(url.pathname)) return;
        toPath = url.pathname;
      } catch {
        return;
      }
      const from = pageSlug(pathname);
      const to = pageSlug(toPath);
      const decision = shouldEmitRelatedClick(clickState, from, to, Date.now());
      clickState = decision.state;
      if (!decision.emit) return;
      trackGoal("related_click", relatedClickMetadata(pathname, toPath));
    }

    function onPageShow(event: Event) {
      if (cancelled || !("persisted" in event) || !event.persisted) return;
      start = performance.now();
      engaged = false;
      fired50 = false;
      fired90 = false;
      schedule();
    }

    function attach(target: HTMLElement) {
      body = target;
      if (typeof ResizeObserver !== "undefined") {
        resizeObserver = new ResizeObserver(() => {
          if (cancelled) return;
          schedule();
        });
        resizeObserver.observe(target);
      }
      armTimer = window.setTimeout(() => {
        if (cancelled) return;
        schedule();
      }, ARM_MS);
      schedule();
    }

    function boot() {
      if (cancelled || body) return;
      const target = articleColumn();
      if (!target) return;
      mutationObserver?.disconnect();
      mutationObserver = null;
      attach(target);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    document.addEventListener("click", onClick, true);
    window.addEventListener("pageshow", onPageShow);
    boot();
    if (!body) {
      if (typeof MutationObserver !== "undefined") {
        mutationObserver = new MutationObserver(() => boot());
        mutationObserver.observe(document.body, { childList: true, subtree: true });
      }
      let attempts = 0;
      const retry = () => {
        if (cancelled || body) return;
        attempts += 1;
        boot();
        if (!body && attempts < 20) frame = window.requestAnimationFrame(retry);
      };
      frame = window.requestAnimationFrame(retry);
      watchTimer = window.setTimeout(() => {
        mutationObserver?.disconnect();
        mutationObserver = null;
      }, 10_000);
    }

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
      clearTimers();
      resizeObserver?.disconnect();
      mutationObserver?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, [pathname]);

  return null;
}
