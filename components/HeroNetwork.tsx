"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";

function subscribeReducedMotion(onStoreChange: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function NetworkFallback() {
  return (
    <div className="agent-fallback" aria-hidden="true">
      <span className="agent-fallback-ring" />
      <span className="agent-fallback-core" />
    </div>
  );
}

const AgentNetwork = dynamic(() => import("@/components/AgentNetwork").then((mod) => mod.AgentNetwork), {
  ssr: false,
  loading: () => <NetworkFallback />,
});

/** Client-only hero illustration. The shell is already sized, so this chunk cannot shift layout. */
export function HeroNetwork() {
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => true,
  );

  return (
    <div className="agent-slot">
      <AgentNetwork animated={!reduceMotion} />
    </div>
  );
}
