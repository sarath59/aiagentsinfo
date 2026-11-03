"use client";

import { useEffect, useRef } from "react";

/** Pointer parallax for the harness scene. The SVG itself paints without this chunk. */
export function HeroPointer() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const stage = ref.current?.closest<HTMLElement>("[data-hero-stage]");
    if (!stage) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    function onMove(event: PointerEvent) {
      if (reduce.matches) return;
      const rect = stage!.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      stage!.style.setProperty("--px", px.toFixed(3));
      stage!.style.setProperty("--py", py.toFixed(3));
    }

    function onLeave() {
      stage!.style.setProperty("--px", "0");
      stage!.style.setProperty("--py", "0");
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        stage.classList.toggle("hero-paused", !entry?.isIntersecting);
      },
      { threshold: 0.05 },
    );

    observer.observe(stage);
    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerleave", onLeave);

    return () => {
      observer.disconnect();
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <span ref={ref} aria-hidden className="absolute h-px w-px overflow-hidden" />;
}
