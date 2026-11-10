/** DataFast goals. The site script is https://datafa.st/js/script.js in app/layout.tsx.
 *  This site has no newsletter. Do not add a newsletter_signup goal.
 */

const GOAL_NAME = /^[a-z0-9_:-]{1,64}$/;
/** The browser script rejects a custom property name longer than 32 characters. */
const META_KEY = /^[a-z0-9_-]{1,32}$/;

type Datafast = {
  (name: string, metadata?: Record<string, string>): void;
  q?: unknown[];
};

function ensureDatafast(): Datafast | null {
  if (typeof window === "undefined") return null;
  const host = window as Window & { datafast?: Datafast };
  if (typeof host.datafast !== "function") {
    const queued = function datafastQueue(name: string, metadata?: Record<string, string>) {
      const fn = queued as Datafast;
      fn.q = fn.q || [];
      fn.q.push(metadata ? [name, metadata] : [name]);
    } as Datafast;
    host.datafast = queued;
  }
  return host.datafast;
}

function goalMetadata(metadata?: Record<string, string>) {
  if (!metadata) return undefined;
  const params: Record<string, string> = {};
  for (const [key, value] of Object.entries(metadata)) {
    if (!META_KEY.test(key) || typeof value !== "string") continue;
    const clean = value.replace(/[<>'"&]/g, "").trim().slice(0, 255);
    if (!clean || clean.includes("@")) continue;
    params[key] = clean;
    if (Object.keys(params).length >= 10) break;
  }
  return Object.keys(params).length ? params : undefined;
}

export function trackGoal(name: string, metadata?: Record<string, string>) {
  if (typeof window === "undefined" || !GOAL_NAME.test(name)) return;
  const datafast = ensureDatafast();
  if (!datafast) return;
  const params = goalMetadata(metadata);
  if (params) datafast(name, params);
  else datafast(name);
}
