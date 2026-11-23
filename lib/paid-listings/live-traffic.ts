import { daysAgoIso, supabaseSelect } from "@/lib/bot-tracking/queries";

export type LiveAiTraffic = {
  days: number;
  answer: number;
  training: number;
  search: number;
  chatgpt: number;
  total: number;
  live: boolean;
};

type DailyRow = {
  purpose?: string;
  bot_token?: string;
  hits?: number | string;
};

/** Live totals from first-party bot_hits (via bot_daily_counts). */
export async function getLiveAiTraffic(days = 30): Promise<LiveAiTraffic> {
  const empty: LiveAiTraffic = {
    days,
    answer: 0,
    training: 0,
    search: 0,
    chatgpt: 0,
    total: 0,
    live: false,
  };

  try {
    const since = daysAgoIso(days).slice(0, 10);
    const rows = (await supabaseSelect(
      `bot_daily_counts?day=gte.${encodeURIComponent(since)}&select=purpose,bot_token,hits&limit=5000`,
    )) as DailyRow[];

    if (!Array.isArray(rows) || !rows.length) return empty;

    let answer = 0;
    let training = 0;
    let search = 0;
    let chatgpt = 0;
    let total = 0;

    for (const row of rows) {
      const hits = Number(row.hits) || 0;
      total += hits;
      const purpose = (row.purpose || "").toLowerCase();
      if (purpose === "answer") answer += hits;
      else if (purpose === "training") training += hits;
      else if (purpose === "search") search += hits;
      if ((row.bot_token || "").toLowerCase() === "chatgpt-user") chatgpt += hits;
    }

    return { days, answer, training, search, chatgpt, total, live: true };
  } catch {
    return empty;
  }
}

export function formatTraffic(n: number) {
  return n.toLocaleString("en-US");
}
