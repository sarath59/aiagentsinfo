import { FEATURED_DAYS, TRAFFIC_DISPLAY_FLOORS } from "@/lib/paid-listings/offer";

export type LiveAiTraffic = {
  days: number;
  answer: number;
  training: number;
  search: number;
  chatgpt: number;
  total: number;
};

/** Static sell-page traffic figures (no live bot logging). */
export function getLiveAiTraffic(days = FEATURED_DAYS): LiveAiTraffic {
  const answer = TRAFFIC_DISPLAY_FLOORS.answer;
  const chatgpt = TRAFFIC_DISPLAY_FLOORS.chatgpt;
  const training = TRAFFIC_DISPLAY_FLOORS.training;
  const search = TRAFFIC_DISPLAY_FLOORS.search;
  return {
    days,
    answer,
    chatgpt,
    training,
    search,
    total: answer + training + search,
  };
}

export function formatTraffic(n: number) {
  return n.toLocaleString("en-US");
}
