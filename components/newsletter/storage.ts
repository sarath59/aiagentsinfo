const SUBSCRIBED_KEY = "aai.newsletter.subscribed";
const DISMISSED_KEY = "aai.newsletter.dismissedAt";
const DISMISS_FOR_MS = 30 * 24 * 60 * 60 * 1000;

function storage(): Storage | null {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

export function markNewsletterSubscribed() {
  storage()?.setItem(SUBSCRIBED_KEY, "1");
}

export function markNewsletterDismissed() {
  storage()?.setItem(DISMISSED_KEY, String(Date.now()));
}

/** Popup stays hidden after a signup, and for 30 days after a close. */
export function canShowNewsletterPopup() {
  const store = storage();
  if (!store) return false;
  if (store.getItem(SUBSCRIBED_KEY) === "1") return false;
  const dismissed = Number(store.getItem(DISMISSED_KEY) || "0");
  if (Number.isFinite(dismissed) && dismissed > 0 && Date.now() - dismissed < DISMISS_FOR_MS) {
    return false;
  }
  return true;
}
