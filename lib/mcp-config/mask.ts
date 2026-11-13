const TOKEN =
  /(?:ghp_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}|gho_[A-Za-z0-9]{20,}|ghu_[A-Za-z0-9]{20,}|ghs_[A-Za-z0-9]{20,}|ghr_[A-Za-z0-9]{20,}|sk-ant-[A-Za-z0-9_-]{10,}|sk-[A-Za-z0-9]{20,}|xox[baprs]-[A-Za-z0-9-]{10,}|AKIA[0-9A-Z]{16}|glpat-[A-Za-z0-9_-]{20,}|ya29\.[A-Za-z0-9._-]{20,})/g;

const SECRET_KEY = /(token|secret|password|passwd|api[_-]?key|authorization|credential|private[_-]?key)/i;
const PLACEHOLDER =
  /(replace[_-]?on[_-]?this[_-]?machine|replace|your[_-]?|example|placeholder|changeme|todo|xxx+|<[^>]+>|some_key|^value$)/i;

export function maskSecrets(value: string): string {
  return value.replace(TOKEN, "[redacted]");
}

export function maskDeep<T>(value: T): T {
  if (typeof value === "string") return maskSecrets(value) as T;
  if (Array.isArray(value)) return value.map((item) => maskDeep(item)) as T;
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [key, item] of Object.entries(value)) out[key] = maskDeep(item);
    return out as T;
  }
  return value;
}

export function isReference(value: string): boolean {
  const trimmed = value.trim();
  return /^\$\{[^{}]+\}$/.test(trimmed) || /^Bearer\s+\$\{[^{}]+\}$/i.test(trimmed);
}

export function isHardcodedSecret(key: string, value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed || isReference(trimmed)) return false;
  const bearer = trimmed.replace(/^Bearer\s+/i, "");
  TOKEN.lastIndex = 0;
  if (TOKEN.test(trimmed) || TOKEN.test(bearer)) {
    TOKEN.lastIndex = 0;
    return true;
  }
  TOKEN.lastIndex = 0;
  if (!SECRET_KEY.test(key)) return false;
  if (PLACEHOLDER.test(trimmed)) return false;
  return trimmed.length >= 16;
}
