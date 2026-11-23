"use client";

import { trackGoal } from "@/lib/analytics";
import { LIST_TOOL_BUY_CLICK, listToolMeta } from "@/lib/analytics/list-tool-goals";

/** Scrolls to the pre-pay form. Same buy-click goal as before. */
export function ListToolBuyButton({
  className = "btn-primary focus-ring inline-flex px-7 py-3 text-sm",
  label = "Buy 30-day featured listing",
  placement = "primary",
}: {
  className?: string;
  label?: string;
  placement?: string;
}) {
  return (
    <a
      href="#list-tool-checkout"
      className={className}
      data-track-buy={placement === "primary" ? "1" : undefined}
      onClick={() =>
        trackGoal(LIST_TOOL_BUY_CLICK, listToolMeta({ cta: "stripe_buy", placement }))
      }
    >
      {label}
    </a>
  );
}
