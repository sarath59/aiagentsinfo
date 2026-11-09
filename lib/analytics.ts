/** DataFast goals. The site script is https://datafa.st/js/script.js in app/layout.tsx. */
export function trackGoal(name: string) {
  if (typeof window === "undefined") return;
  const datafast = (window as Window & { datafast?: (goal: string) => void }).datafast;
  if (typeof datafast === "function") datafast(name);
}
