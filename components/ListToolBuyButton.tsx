"use client";

import { FEATURED_PRICE_LABEL } from "@/lib/paid-listings/offer";

/** Scrolls to the pre-pay form. */
export function ListToolBuyButton({
  className = "btn-primary focus-ring inline-flex px-7 py-3 text-sm",
  label = `Get featured · ${FEATURED_PRICE_LABEL}`,
}: {
  className?: string;
  label?: string;
  placement?: string;
}) {
  return (
    <a href="#list-tool-checkout" className={className}>
      {label}
    </a>
  );
}
