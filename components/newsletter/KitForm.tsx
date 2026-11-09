"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";
import { trackGoal } from "@/lib/analytics";
import { markNewsletterSubscribed } from "./storage";

const KIT_SRC = "https://ai-agents-3.kit.com/f0dc320687/index.js";
const KIT_UID = "f0dc320687";
const CK_SRC = "https://f.convertkit.com/ckjs/ck.5.js";

type KitEntry = {
  element: HTMLElement;
  uid?: string;
  format?: string;
  initialized?: boolean;
  settings?: {
    modal?: { trigger?: string; devices?: string };
  };
};

declare global {
  interface Window {
    __sv_forms?: KitEntry[];
    __aaiKitGuard?: boolean;
    __aaiKitEnsure?: number;
  }
}

/**
 * This Kit form is published as a modal (display:none, opened by ck.js on its
 * own timer). Pin every copy to inline before ck.js builds it so the fields
 * stay in the slot that owns the script tag.
 */
function pinKitForms() {
  document.querySelectorAll<HTMLFormElement>(`form[data-uid="${KIT_UID}"]`).forEach((form) => {
    if (form.dataset.format !== "inline") form.dataset.format = "inline";
  });
  window.__sv_forms?.forEach((entry) => {
    if (entry.uid !== KIT_UID) return;
    entry.format = "inline";
    if (entry.settings?.modal) {
      entry.settings.modal.trigger = "none";
      entry.settings.modal.devices = "none";
    }
  });
}

function pendingForms() {
  return [...document.querySelectorAll<HTMLFormElement>(`form[data-uid="${KIT_UID}"]`)].filter((form) => {
    const entry = window.__sv_forms?.find((item) => item.element === form);
    return !entry?.initialized;
  });
}

let ensureAttempts = 0;

function scheduleEnsure() {
  window.clearTimeout(window.__aaiKitEnsure);
  window.__aaiKitEnsure = window.setTimeout(() => {
    pinKitForms();
    if (!pendingForms().length) {
      ensureAttempts = 0;
      return;
    }
    if (ensureAttempts >= 5) return;
    ensureAttempts += 1;
    const script = document.createElement("script");
    script.async = true;
    script.src = CK_SRC;
    script.addEventListener("load", () => {
      pinKitForms();
      if (pendingForms().length) scheduleEnsure();
      else ensureAttempts = 0;
    });
    document.body.appendChild(script);
  }, 400);
}

function startGuard() {
  if (window.__aaiKitGuard) return;
  window.__aaiKitGuard = true;
  document.addEventListener("ckjs:submission:complete", (event) => {
    const uid = (event as CustomEvent<{ uid?: string }>).detail?.uid;
    if (!uid || uid === KIT_UID) {
      markNewsletterSubscribed();
      trackGoal("newsletter_signup");
    }
  });
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (!(node instanceof Element)) continue;
        const matched =
          node.matches(`form[data-uid="${KIT_UID}"], script[data-uid="${KIT_UID}"]`) ||
          Boolean(node.querySelector(`form[data-uid="${KIT_UID}"], script[data-uid="${KIT_UID}"]`));
        if (!matched) continue;
        pinKitForms();
        scheduleEnsure();
        return;
      }
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

function onKitScriptLoad() {
  pinKitForms();
  scheduleEnsure();
}

export function KitForm({ instanceId }: { instanceId: string }) {
  const slotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startGuard();
    const slot = slotRef.current;
    if (!slot) return;

    // next/script dedupes by src and appends the tag to document.body, so it
    // cannot paint an inline Kit form in this slot or again after a client
    // navigation. A script element mounted here is where Kit renders, and a
    // fresh one is inserted every time this slot mounts.
    const script = document.createElement("script");
    script.async = true;
    script.dataset.uid = KIT_UID;
    script.dataset.kitSlot = instanceId;
    script.src = KIT_SRC;
    script.addEventListener("load", onKitScriptLoad);
    slot.appendChild(script);

    return () => {
      slot.replaceChildren();
    };
  }, [instanceId]);

  return (
    <div ref={slotRef} className="kit-form-slot" data-kit-slot={instanceId}>
      <Script src={KIT_SRC} strategy="afterInteractive" onLoad={onKitScriptLoad} />
    </div>
  );
}
