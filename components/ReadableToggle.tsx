"use client";

import { useState } from "react";

export function ReadableToggle({ children }: { children: React.ReactNode }) {
  const [large, setLarge] = useState(false);

  return (
    <div className={large ? "readable-lg" : ""}>
      <button
        type="button"
        className="focus-ring mb-6 rounded-full border border-[var(--stroke)] px-4 py-2 text-sm"
        aria-pressed={large}
        onClick={() => setLarge((value) => !value)}
      >
        {large ? "Standard text size" : "Larger, more readable text"}
      </button>
      {children}
    </div>
  );
}
