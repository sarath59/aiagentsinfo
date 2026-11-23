import openaiChatgptUser from "@/data/bot-ip-ranges/openai-chatgpt-user.json" with { type: "json" };
import openaiGptbot from "@/data/bot-ip-ranges/openai-gptbot.json" with { type: "json" };
import openaiSearchbot from "@/data/bot-ip-ranges/openai-searchbot.json" with { type: "json" };
import googleGooglebot from "@/data/bot-ip-ranges/google-googlebot.json" with { type: "json" };

export type IpVerified = "verified" | "unverified" | "unknown";

type PrefixFile = {
  creationTime?: string;
  prefixes?: { ipv4Prefix?: string; ipv6Prefix?: string }[];
};

type CidrRule = { version: 4 | 6; network: bigint; mask: bigint };

const OPERATOR_FILES: { operator: string; file: PrefixFile }[] = [
  { operator: "OpenAI", file: openaiChatgptUser as PrefixFile },
  { operator: "OpenAI", file: openaiGptbot as PrefixFile },
  { operator: "OpenAI", file: openaiSearchbot as PrefixFile },
  { operator: "Google", file: googleGooglebot as PrefixFile },
];

const rangesByOperator = new Map<string, CidrRule[]>();

for (const { operator, file } of OPERATOR_FILES) {
  const list = rangesByOperator.get(operator) ?? [];
  for (const prefix of file.prefixes ?? []) {
    const rule = parseCidr(prefix.ipv4Prefix) ?? parseCidr(prefix.ipv6Prefix);
    if (rule) list.push(rule);
  }
  rangesByOperator.set(operator, list);
}

export function clientIp(request: Request): string | null {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first && isPlausibleIp(first)) return first;
  }
  for (const header of ["cf-connecting-ip", "x-real-ip", "x-vercel-forwarded-for"]) {
    const value = request.headers.get(header)?.trim();
    if (value && isPlausibleIp(value.split(",")[0]!.trim())) {
      return value.split(",")[0]!.trim();
    }
  }
  return null;
}

export async function hashIp(ip: string | null): Promise<string> {
  if (!ip) return "";
  const salt =
    process.env.BOT_TRACKING_IP_SALT?.trim() ||
    process.env.BOT_TRACKING_API_KEY?.trim() ||
    process.env.SUPABASE_SECRET_KEY?.trim() ||
    "bot-tracking";
  const data = new TextEncoder().encode(`${salt}:${ip}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return hex(digest).slice(0, 32);
}

export function verifyIp(ip: string | null, operator: string): IpVerified {
  if (!ip) return "unknown";
  const ranges = rangesByOperator.get(operator);
  if (!ranges?.length) return "unknown";
  const addr = parseIp(ip);
  if (!addr) return "unknown";
  for (const rule of ranges) {
    if (rule.version !== addr.version) continue;
    if ((addr.value & rule.mask) === rule.network) return "verified";
  }
  return "unverified";
}

export function operatorsWithIpRanges() {
  return [...rangesByOperator.keys()];
}

function isPlausibleIp(value: string) {
  return parseIp(value) !== null;
}

function parseCidr(cidr: string | undefined): CidrRule | null {
  if (!cidr) return null;
  const [ip, bitsRaw] = cidr.split("/");
  if (!ip || bitsRaw === undefined) return null;
  const bits = Number(bitsRaw);
  if (!Number.isFinite(bits) || bits < 0) return null;
  const addr = parseIp(ip);
  if (!addr) return null;
  const width = addr.version === 4 ? 32 : 128;
  if (bits > width) return null;
  const zero = BigInt(0);
  const one = BigInt(1);
  const mask =
    bits === 0
      ? zero
      : addr.version === 4
        ? ((BigInt(0xffffffff) << BigInt(32 - bits)) & BigInt(0xffffffff))
        : bits === 128
          ? (one << BigInt(128)) - one
          : ((one << BigInt(bits)) - one) << BigInt(128 - bits);
  return { version: addr.version, network: addr.value & mask, mask };
}

function parseIp(value: string): { version: 4 | 6; value: bigint } | null {
  if (value.includes(".")) {
    const parts = value.split(".");
    if (parts.length !== 4) return null;
    let n = BigInt(0);
    for (const part of parts) {
      if (!/^\d{1,3}$/.test(part)) return null;
      const octet = Number(part);
      if (octet > 255) return null;
      n = (n << BigInt(8)) + BigInt(octet);
    }
    return { version: 4, value: n };
  }
  if (!value.includes(":")) return null;
  const expanded = expandIpv6(value);
  if (!expanded) return null;
  let n = BigInt(0);
  for (const group of expanded) {
    n = (n << BigInt(16)) + BigInt(parseInt(group, 16));
  }
  return { version: 6, value: n };
}

function expandIpv6(value: string): string[] | null {
  const lower = value.toLowerCase();
  if (lower === "::") return Array(8).fill("0");
  const sides = lower.split("::");
  if (sides.length > 2) return null;
  const head = sides[0] ? sides[0].split(":") : [];
  const tail = sides.length === 2 && sides[1] ? sides[1].split(":") : sides.length === 1 ? [] : [];
  if (sides.length === 1) {
    if (head.length !== 8) return null;
    return head.map(normalizeGroup);
  }
  const missing = 8 - head.length - tail.length;
  if (missing < 0) return null;
  const groups = [...head, ...Array(missing).fill("0"), ...tail];
  if (groups.length !== 8) return null;
  return groups.map(normalizeGroup);
}

function normalizeGroup(group: string) {
  if (!group) return "0";
  if (!/^[0-9a-f]{1,4}$/i.test(group)) return "0";
  return group.toLowerCase();
}

function hex(buffer: ArrayBuffer) {
  return [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
