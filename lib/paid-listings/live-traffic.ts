import { daysAgoIso, supabaseSelect } from "@/lib/bot-tracking/queries";
import { FEATURED_DAYS, TRAFFIC_DISPLAY_FLOORS } from "@/lib/paid-listings/offer";

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

function withFloors(raw: Omit<LiveAiTraffic, "live"> & { live: boolean }): LiveAiTraffic {
  const answer = Math.max(raw.answer, TRAFFIC_DISPLAY_FLOORS.answer);
  const chatgpt = Math.max(raw.chatgpt, TRAFFIC_DISPLAY_FLOORS.chatgpt);
  const training = Math.max(raw.training, TRAFFIC_DISPLAY_FLOORS.training);
  const search = Math.max(raw.search, TRAFFIC_DISPLAY_FLOORS.search);
  const flooredSum = answer + training + search;
  return {
    days: raw.days,
    answer,
    chatgpt,
    training,
    search,
    total: Math.max(raw.total, flooredSum),
    live: raw.live,
  };
}

/** Live totals from first-party bot_hits (via bot_daily_counts), floored for the sell page. */
export async function getLiveAiTraffic(days = FEATURED_DAYS): Promise<LiveAiTraffic> {
  const empty = withFloors({
    days,
    answer: 0,
    training: 0,
    search: 0,
    chatgpt: 0,
    total: 0,
    live: false,
  });

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

    return withFloors({ days, answer, training, search, chatgpt, total, live: true });
  } catch {
    return empty;
  }
}

export function formatTraffic(n: number) {
  return n.toLocaleString("en-US");
}
