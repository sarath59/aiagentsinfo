"use client";

import { useRouter } from "next/navigation";
import type { ReactNode, MouseEvent } from "react";
import { trackGoal } from "@/lib/analytics";
import { HERO_DIRECTORY_CLICK, listToolMeta } from "@/lib/analytics/list-tool-goals";

/** Hero click (outside links/forms) opens the directory. */
export function LabHeroShell({ children }: { children: ReactNode }) {
  const router = useRouter();

  function onClick(event: MouseEvent<HTMLElement>) {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (target.closest("a, button, input, textarea, select, label, form, [data-hero-stop]")) return;
    trackGoal(HERO_DIRECTORY_CLICK, listToolMeta({ placement: "home_hero" }));
    router.push("/directory");
  }

  return (
    <section className="lab-hero" aria-labelledby="home-heading" onClick={onClick}>
      {children}
    </section>
  );
}
