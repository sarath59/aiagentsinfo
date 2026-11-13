/** DataFast goals. The site script is https://datafa.st/js/script.js in app/layout.tsx.
 *  The queue stub in that layout matches https://datafa.st/docs/custom-goals.
 *  Goal names: lowercase letters, digits, underscore, hyphen, colon. Max 64.
 *  The browser script rejects a custom property name longer than 32 characters,
 *  even though the goal API docs allow 64. Values are strings, max 255. Max 10 keys.
 *  The script drops localhost, navigator.webdriver, and headless or Playwright user agents.
 *  This site has no newsletter. Do not add a newsletter_signup goal.
 */

const GOAL_NAME = /^[a-z0-9_:-]{1,64}$/;
/** The browser script rejects a custom property name longer than 32 characters. */
const META_KEY = /^[a-z0-9_-]{1,32}$/;
const TOOL_SLUG = /^[a-z0-9_-]{1,64}$/;

type Datafast = {
  (name: string, metadata?: Record<string, string>): void;
  q?: unknown[];
};

export type ToolGoalName = "tool_view" | "tool_run" | "tool_output_used";
export type ToolOutputAction = "copy_result" | "copy_link" | "download";

function ensureDatafast(): Datafast | null {
  if (typeof window === "undefined") return null;
  const host = window as Window & { datafast?: Datafast };
  if (typeof host.datafast !== "function") {
    // The documented stub pushes `arguments`. This push is the argument list as an array.
    // script.js replays the queue with Array.from, which accepts both.
    const queued = function datafastQueue(...args: unknown[]) {
      const fn = queued as Datafast;
      fn.q = fn.q || [];
      fn.q.push(args);
    } as Datafast;
    host.datafast = queued;
  }
  return host.datafast;
}

/** tool_view on load, tool_run after a successful check, tool_output_used on copy or download. */
export function trackTool(name: ToolGoalName, toolSlug: string, action?: ToolOutputAction) {
  if (!TOOL_SLUG.test(toolSlug)) return;
  if (name === "tool_output_used") {
    if (action !== "copy_result" && action !== "copy_link" && action !== "download") return;
    trackGoal(name, { tool_slug: toolSlug, action });
    return;
  }
  trackGoal(name, { tool_slug: toolSlug });
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
