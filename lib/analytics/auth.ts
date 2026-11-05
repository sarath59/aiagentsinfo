export const ADMIN_COOKIE = "aai_admin";

export function adminKey() {
  return process.env.ANALYTICS_ADMIN_KEY?.trim() || "";
}

export function adminAuthorized(value: string | undefined | null) {
  const expected = adminKey();
  if (!expected || !value) return false;
  return safeEqual(value, expected);
}

function safeEqual(a: string, b: string) {
  const left = new TextEncoder().encode(a);
  const right = new TextEncoder().encode(b);
  const length = Math.max(left.length, right.length);
  let mismatch = left.length === right.length ? 0 : 1;
  for (let i = 0; i < length; i++) mismatch |= (left[i] || 0) ^ (right[i] || 0);
  return mismatch === 0;
}
