import type { ChartSpec, ReportChapter } from "@/lib/report-model";

const num = new Intl.NumberFormat("en-US");

export const path = "/reports/voice-agents-next-6-months";
export const title =
  "Voice agents, Nov 2026 to May 2027: November 17 can retire two Gemini Live previews. January 20 retires gpt-realtime.";
export const thesis =
  "The dates on the pages checked November 11 are model retirements. Google lists November 17, 2026 as the earliest shutdown for two Live previews. OpenAI removes gpt-realtime on January 20, 2027. No hosted minute rate in this set has a change date.";
export const description =
  "A six-month outlook for AI voice agents, November 11, 2026 through May 2027: per-minute prices, speech-to-speech versus a cascaded stack, LiveKit Agents and Pipecat, SIP, and the model ids with a shutdown date. Checked November 11, 2026.";
export const readOn = "2026-11-11";
export const readingMinutes = 20;

function usd(value: number, digits: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

function units(dollars: number) {
  return Math.round(dollars * 10_000);
}

/** OpenAI: user audio is 1 token per 100 ms, assistant audio 1 token per 50 ms. */
const callerTokensPerMinute = 600;
const agentTokensPerMinute = 1_200;
function tokenMinute(tokens: number, dollarsPerMillion: number) {
  return (tokens * dollarsPerMillion) / 1_000_000;
}

const realtimeIn = tokenMinute(callerTokensPerMinute, 32);
const realtimeOut = tokenMinute(agentTokensPerMinute, 64);
const realtimeBoth = realtimeIn + realtimeOut;
const miniIn = tokenMinute(callerTokensPerMinute, 10);
const miniOut = tokenMinute(agentTokensPerMinute, 20);
const miniBoth = miniIn + miniOut;
const geminiAudioBoth = 0.005 + 0.018;

const vapiLow = 0.05 + 0.0095 + 0.0077 + 0.0146;
const vapiHigh = 0.05 + 0.0099 + 0.0452 + 0.0238;
const retellStack = 0.055 + 0.015 + 0.04;
const livekitShown = 0.01 + 0.01 + 0.0014 + 0.0075 + 0.009 + 0.01;

const pipecatStars = 17_194;
const livekitStars = 15_174;
const starGap = pipecatStars - livekitStars;

if (units(realtimeBoth) !== 960) throw new Error("gpt-realtime-2.1 minute arithmetic");
if (units(miniBoth) !== 300) throw new Error("gpt-realtime-2.1-mini minute arithmetic");
if (units(geminiAudioBoth) !== 230) throw new Error("Gemini audio equivalents");
if (units(vapiLow) !== 818) throw new Error("Vapi low end");
if (units(vapiHigh) !== 1289) throw new Error("Vapi high end");
if (units(retellStack) !== 1100) throw new Error("Retell stack");
if (units(livekitShown) !== 479) throw new Error("LiveKit calculator lines");
if (starGap !== 2_020) throw new Error("star gap");

const livekitForks = 4_118;
const pipecatForks = 3_086;

export const keyNumbers = [
  {
    value: "Nov 17",
    label: "earliest Gemini Live preview cutoff",
    note: "gemini-3.1-flash-live-preview and gemini-2.5-flash-native-audio-preview-12-2025. Google says earliest possible, not the confirmed day.",
  },
  {
    value: "Jan 20",
    label: "gpt-realtime leaves the OpenAI API",
    note: "Also gpt-4o-realtime and gpt-realtime-mini. Notice dated July 20, 2026. tts-1 leaves January 6.",
  },
  {
    value: usd(0.08, 2),
    label: "ElevenLabs additional minute, every plan",
    note: "Burst past the concurrency cap is $0.16. The language model is a separate bill. No change date on the page.",
  },
  {
    value: num.format(starGap),
    label: "Pipecat stars ahead of LiveKit Agents",
    note: "17,194 versus 15,174. GitHub API, 10:49 GMT, November 11. Pipecat's description still says Daily.",
  },
];

export const findings = [
  "Google's deprecations page lists November 17, 2026 as the earliest possible shutdown for gemini-3.1-flash-live-preview and gemini-2.5-flash-native-audio-preview-12-2025. The replacement on both rows is gemini-3.8-live. The page says it will communicate the exact day.",
  "OpenAI removes tts-1, tts-1-hd, and gpt-4o-mini-tts on January 6, 2027, and names gpt-realtime-2.1-mini as the replacement. On January 20 it removes gpt-realtime, gpt-4o-realtime, and gpt-realtime-mini. The notice is dated July 20, 2026.",
  "ElevenLabs bills additional agent minutes at $0.08 on Free through Business. Burst minutes are $0.16. The pricing page says the language model is billed separately and varies by model. It prints no model dollar amount and no date when $0.08 changes.",
  `GPT-Live-1 is ${usd(0.05, 2)} per minute of session time, including silence, with the backend model extra. One minute of caller audio plus one minute of agent audio on gpt-realtime-2.1 is ${usd(realtimeBoth, 3)} before later turns resend the history. Those are two OpenAI products.`,
  `pipecat-ai/pipecat had ${num.format(pipecatStars)} stars and livekit/agents had ${num.format(livekitStars)} at 10:49 GMT on November 11. Deepgram's October 29 post says it is acquiring Daily and that Pipecat stays BSD-licensed and open. The repository description still says it is maintained by Daily.`,
];

export const executiveSummary = [
  "Two clocks are running, and neither one is a price cut. Google's deprecations page, fetched November 11, 2026, lists November 17, 2026 as the earliest possible shutdown for gemini-3.1-flash-live-preview and for gemini-2.5-flash-native-audio-preview-12-2025. The replacement on both rows is gemini-3.8-live, which the same page lists with no shutdown date. Google's own note says the table is the earliest a model might be retired, and that the exact day comes in a later notice. OpenAI's deprecations page removes tts-1, tts-1-hd, and gpt-4o-mini-tts on January 6, 2027, and removes gpt-realtime, gpt-4o-realtime, and gpt-realtime-mini on January 20, 2027. [[3]][[7]]",
  `The minute rates on the hosted platforms have no such date. ElevenLabs Agents charges ${usd(0.08, 2)} for an additional minute on every column from Free through Business, and ${usd(0.16, 2)} when a call bursts past the concurrency cap. The language model is extra. Cartesia's managed-agent minute is ${usd(0.03, 2)}, down from a ${usd(0.06, 2)} figure the page still prints as the previous rate, and the LLM is extra. Deepgram's standard Voice Agent API is ${usd(0.075, 3)} a minute on pay as you go, calculated on WebSocket connection time, with speech-to-text, a managed model, and speech included. Bland Start is ${usd(0.14, 2)} with the model in the minute. None of those pages names a day between November 11 and May 31 when the rate changes. [[1]][[9]][[11]][[21]]`,
  `OpenAI sells two voice meters that do not add. GPT-Live-1 is ${usd(0.05, 2)} per minute of session time, billed per second, and the session includes silence and backend waits. gpt-realtime-2.1 bills audio tokens: ${usd(32, 0)} per million in and ${usd(64, 0)} per million out. A minute of caller audio is 600 tokens and a minute of agent audio is 1,200. That pair is ${usd(realtimeBoth, 3)} before the next turn sends the whole conversation again. Gemini 3.8 Live prints ${usd(0.005, 3)} a minute of audio in and ${usd(0.018, 3)} a minute of audio out. Adding those two published equivalents is ${usd(geminiAudioBoth, 3)}, and it is not a session price. A buyer who ranks these numbers as one league table is ranking different objects. [[2]][[4]][[6]]`,
];

const months = [
  {
    month: "November 2026",
    announced:
      "Google lists November 17, 2026 as the earliest possible shutdown for gemini-3.1-flash-live-preview and gemini-2.5-flash-native-audio-preview-12-2025. Replacement: gemini-3.8-live. The same earliest date is on gemini-3.1-flash-tts-preview. ElevenAgents Campaign Manager was published November 9, before this check.",
    likely: "No source read for this brief aims an undated voice-agent release at the rest of November.",
    watch: "Whether Google sends the exact shutdown notice, and whether pipecat-ai/pipecat's description still names Daily.",
  },
  {
    month: "December 2026",
    announced:
      "Deepgram's pricing page ends a Flux text-to-speech credit match on December 31, 2026: $1 of credits per $1 spent, up to $500. That line is text-to-speech, not the Voice Agent API rate.",
    likely: "No source read for this brief aims an undated voice-agent release at December.",
    watch: "Whether Deepgram names a general-availability day for the Voice Agent Platform previewed on October 29.",
  },
  {
    month: "January 2027",
    announced:
      "January 6: OpenAI removes tts-1, tts-1-hd, and gpt-4o-mini-tts. The named replacement is gpt-realtime-2.1-mini. January 20: OpenAI removes gpt-realtime, gpt-realtime-2025-08-28, gpt-4o-realtime, gpt-realtime-mini, gpt-realtime-mini-2025-12-15, and gpt-4o-mini-realtime. Replacements: gpt-realtime-2.1 and gpt-realtime-2.1-mini. Notice dated July 20, 2026.",
    likely: "The January dates are announced. This brief does not add a likely release on top of them.",
    watch: "Production agents still calling the removed ids on January 7 and January 21.",
  },
  {
    month: "February 2027",
    announced: "No page in this set names a February voice-agent launch or a minute-rate change.",
    likely: "No source read for this brief aims an undated voice-agent release at February.",
    watch: "A Deepgram platform date, a Pipecat license change, or a hosted minute rate with a start day. None is on a page read today.",
  },
  {
    month: "March 2027",
    announced: "No page in this set names a March voice-agent launch or a minute-rate change.",
    likely: "No source read for this brief aims an undated voice-agent release at March.",
    watch: "Same three watches as February. A blank month stays blank until a page names it.",
  },
  {
    month: "April 2027",
    announced: "No page in this set names an April voice-agent launch or a minute-rate change.",
    likely: "No source read for this brief aims an undated voice-agent release at April.",
    watch: "Same three watches. OpenAI's deprecations page has other April removals. This brief did not treat them as voice-agent ids.",
  },
  {
    month: "May 2027",
    announced: "No page in this set names a May voice-agent launch. May is the end of this brief.",
    likely: "No source read for this brief aims an undated voice-agent release at May.",
    watch: "Re-read the minute table and the two shutdown pages. The question for May is whether any of them moved.",
  },
];

export const sources = [
  {
    n: 1,
    title: "ElevenLabs, ElevenAgents pricing",
    url: "https://elevenlabs.io/pricing/agents",
    detail:
      "Fetched November 11, 2026. HTTP Date Wed, 11 Nov 2026 10:49:17 GMT. Additional minutes $0.08 on every plan, burst $0.16, text messages $0.003. LLM 'based on usage and varies by model.' Telephony 'at cost.'",
  },
  {
    n: 2,
    title: "OpenAI API pricing",
    url: "https://developers.openai.com/api/docs/pricing",
    detail:
      "Fetched November 11, 2026. HTTP Date Wed, 11 Nov 2026 10:49:16 GMT. Last-Modified Wed, 11 Nov 2026 10:32:27 GMT. gpt-live-1 is $0.05 per minute. gpt-realtime-2.1 audio is $32 in, $64 out, $0.40 cached, per million tokens. The mini audio rates are $10, $20, and $0.30.",
  },
  {
    n: 3,
    title: "OpenAI API deprecations",
    url: "https://developers.openai.com/api/docs/deprecations",
    detail:
      "Fetched November 11, 2026. HTTP Date Wed, 11 Nov 2026 10:49:38 GMT. Last-Modified 10:32:20 GMT. Section 2026-10-01 removes the text-to-speech models on January 6, 2027. Section 2026-07-20 removes the legacy realtime models on January 20, 2027.",
  },
  {
    n: 4,
    title: "OpenAI, voice latency and cost",
    url: "https://developers.openai.com/api/docs/guides/voice-latency-cost",
    detail:
      "Fetched November 11, 2026. HTTP Date Wed, 11 Nov 2026 10:49:16 GMT. Last-Modified 10:32:22 GMT. User audio is 1 token per 100 ms. Assistant audio is 1 token per 50 ms. The whole conversation is sent on each response. GPT-Live session time includes silence.",
  },
  {
    n: 5,
    title: "OpenAI, voice agents",
    url: "https://developers.openai.com/api/docs/guides/voice-agents",
    detail:
      "Fetched November 11, 2026. HTTP Date Wed, 11 Nov 2026 10:50:20 GMT. Last-Modified 10:38:35 GMT. Three architectures: GPT-Live, the Realtime API, and a chained speech-to-text, agent, speech pipeline. The page says to measure audible response latency. It does not print a millisecond.",
  },
  {
    n: 6,
    title: "Gemini Developer API pricing",
    url: "https://ai.google.dev/gemini-api/docs/pricing",
    detail:
      "Fetched November 11, 2026. The URL returned 301 to https://aistudio.google.com/docs/pricing. HTTP Date on the 200 was Wed, 11 Nov 2026 10:49:38 GMT. gemini-3.8-live, the extended-thinking id, and gemini-3.1-flash-live-preview share one paid table: audio input $3.00 per million or $0.005 a minute, audio output $12.00 per million or $0.018 a minute.",
  },
  {
    n: 7,
    title: "Gemini API deprecations",
    url: "https://ai.google.dev/gemini-api/docs/deprecations#live-api-preview-models",
    detail:
      "Fetched November 11, 2026 via the .md URL, which 301'd to AI Studio. HTTP Date Wed, 11 Nov 2026 10:55:17 GMT. The live-api preview table lists November 17, 2026 for gemini-3.1-flash-live-preview and gemini-2.5-flash-native-audio-preview-12-2025, both replaced by gemini-3.8-live. The page says shutdown dates are the earliest a model might be retired.",
  },
  {
    n: 8,
    title: "Google, Gemini 3.8 Live and 3.5 Transcribe",
    url: "https://blog.google/innovation-and-ai/technology/developers-tools/build-real-time-voice-applications-gemini-audio/",
    detail:
      "Blog post dated September 15, 2026. Fetched November 11, 2026. HTTP Date Wed, 11 Nov 2026 10:49:17 GMT. States $0.005 a minute of audio input and $0.018 a minute of audio output for Gemini 3.8 Live. Calls the models a speech-to-speech alternative to cascaded stacks.",
  },
  {
    n: 9,
    title: "Deepgram pricing",
    url: "https://deepgram.com/pricing",
    detail:
      "Fetched November 11, 2026. Response Date Wed, 11 Nov 2026 04:17:52 GMT, Vercel cache HIT. Voice Agent standard pay as you go is $0.075 a minute. Custom, bring your own LLM and TTS, is $0.050. Billing is WebSocket connection time. Growth starts at $4,000 a year. Flux TTS credit match runs through December 31, 2026.",
  },
  {
    n: 10,
    title: "Deepgram, acquiring Daily, makers of Pipecat",
    url: "https://deepgram.com/blog/daily-pipecat-deepgram",
    detail:
      "Byline October 29, 2026. Fetched November 11, 2026. Response Date Wed, 11 Nov 2026 04:18:40 GMT. Says Pipecat stays open source under the existing BSD V2 license, that an independent Pipecat Foundation is being established, and that the Voice Agent Platform is forthcoming. No general-availability day.",
  },
  {
    n: 11,
    title: "Cartesia pricing",
    url: "https://www.cartesia.ai/pricing",
    detail:
      "Fetched November 11, 2026. HTTP Date Wed, 11 Nov 2026 10:49:17 GMT. Last-Modified Wed, 11 Nov 2026 02:25:18 GMT. Managed-agent call duration is $0.03 a minute. The page still prints 'previously $0.06.' A Cartesia phone number is $0.014 a minute. LLM usage is billed separately. Evaluations are 'free of charge for a limited time only,' with no end date.",
  },
  {
    n: 12,
    title: "LiveKit Cloud pricing, markdown rate card",
    url: "https://livekit.com/pricing.md",
    detail:
      "Fetched November 11, 2026. HTTP Date Wed, 11 Nov 2026 10:49:37 GMT. Agent session minutes: 1,000 included on Build, 5,000 then $0.01 on Ship, 50,000 then $0.01 on Scale. Third-party SIP is $0.004 a minute after the Ship allowance and $0.003 after Scale. The media-transport row says delivery worldwide in under 250 ms.",
  },
  {
    n: 13,
    title: "LiveKit Cloud pricing page, calculator",
    url: "https://livekit.com/pricing",
    detail:
      "Fetched November 11, 2026. Response Date Wed, 11 Nov 2026 10:24:14 GMT, age 1501 seconds. On the phone-call toggle for Build/Ship the page displayed $0.0479 a minute: session $0.0100, telephony $0.0100, LLM $0.0014, STT $0.0075, TTS $0.0090, observability $0.0100. The total row did not name the models.",
  },
  {
    n: 14,
    title: "GitHub REST API, livekit/agents",
    url: "https://api.github.com/repos/livekit/agents",
    detail:
      "HTTP Date Wed, 11 Nov 2026 10:49:36 GMT. Last-Modified 10:09:15 GMT. stargazers_count 15,174. forks_count 4,118. license SPDX Apache-2.0. pushed_at 2026-11-11T10:32:23Z. Latest release livekit-agents@1.8.11 published 2026-11-05T19:48:29Z, from the releases API at 10:49:37 GMT.",
  },
  {
    n: 15,
    title: "GitHub REST API, pipecat-ai/pipecat",
    url: "https://api.github.com/repos/pipecat-ai/pipecat",
    detail:
      "HTTP Date Wed, 11 Nov 2026 10:49:36 GMT. Last-Modified 08:42:16 GMT. stargazers_count 17,194. forks_count 3,086. license SPDX BSD-2-Clause. Description: 'Maintained by Daily and the community.' pushed_at 2026-11-11T10:47:37Z. Latest release v1.15.0 published 2026-10-29T05:50:54Z.",
  },
  {
    n: 16,
    title: "LiveKit Agents, turn detection and interruptions",
    url: "https://docs.livekit.io/agents/logic/turns/",
    detail:
      "Fetched November 11, 2026. HTTP Date Wed, 11 Nov 2026 10:50:20 GMT. Describes VAD, a turn-detector model, and adaptive interruption. Says Gemini Live keeps turn-taking on its own signals and does not support client-side turn-taking in this SDK.",
  },
  {
    n: 17,
    title: "ElevenLabs, ElevenAgents overview",
    url: "https://elevenlabs.io/docs/eleven-agents/overview",
    detail:
      "Fetched November 11, 2026. HTTP Date Wed, 11 Nov 2026 10:50:21 GMT. Last-Modified 09:46:18 GMT. ElevenAgents can run a cascaded speech-to-text, LLM, speech pipeline with a turn-taking model, or a Realtime speech-to-speech model. Speech Engine and the Realtime API are the other two products. No millisecond on the page.",
  },
  {
    n: 18,
    title: "Vapi pricing",
    url: "https://vapi.ai/pricing",
    detail:
      "Fetched November 11, 2026. Response Date Tue, 10 Nov 2026 18:17:35 GMT. Hosting on the no-success package is $0.05 a minute. Deepgram $0.0095 to $0.0099, OpenAI $0.0077 to $0.0452, ElevenLabs voice $0.0146 to $0.0238. Vapi telephony and SIP are $0. Twilio inbound $0.008, outbound $0.014. The page does not name the model at each end of the range.",
  },
  {
    n: 19,
    title: "Retell AI pricing",
    url: "https://www.retellai.com/pricing",
    detail:
      "Fetched November 11, 2026. HTTP Date Wed, 11 Nov 2026 10:49:38 GMT. Last-Modified Sat, 07 Nov 2026 20:00:17 GMT. Voice infra $0.055 a minute. Platform voices $0.015. GPT 5.1 standard $0.04, fast tier $0.08. US Twilio option value $0.015, shown as the default. Custom SIP is no charge. Phone numbers $2 a month. GPT Realtime 2.1 is $0.38 a minute on the speech-to-speech table.",
  },
  {
    n: 20,
    title: "Bland pricing",
    url: "https://www.bland.ai/pricing",
    detail:
      "Fetched November 11, 2026. Response Date Wed, 11 Nov 2026 10:48:53 GMT. Start is $0.14 a minute and $0 platform fee, 100 calls a day, 10 concurrent. Build is $0.12 a minute plus $299, 2,000 calls a day. The page says no token charges. Telephony is separate, at pass-through. This report did not open the billing doc.",
  },
  {
    n: 21,
    title: "AI Agents Info, LiveKit Agents and Pipecat installs",
    url: "https://www.aiagentsinfo.com/research/livekit-agents-vs-pipecat-installs-november-2026",
    detail:
      "PyPI without_mirrors sums for October 10 through November 8, 2026, read November 10: livekit-agents 4,583,195 and pipecat-ai 1,468,981. Stars that morning were 15,161 and 17,168. This report did not re-sum the downloads.",
  },
  {
    n: 22,
    title: "AI Agents Info, voice agent cost per call",
    url: "https://www.aiagentsinfo.com/blog/voice-ai-agent-cost-per-call-november-2026",
    detail:
      "Worked bills for 1,000 and 10,000 three-minute calls, from the same ElevenLabs, Vapi, Retell, and Bland pages, read November 11, 2026. This outlook does not repeat that invoice. Bland's Scale row, which is on the billing doc and not the marketing page, stays there.",
  },
];

export const reportCharts: ChartSpec[] = [
  {
    id: "published-minutes",
    title: "Published per-minute rates are not the same object",
    caption:
      "Each bar is one rate printed on the vendor's page on November 11, 2026. Bland Start includes the model. ElevenLabs and Cartesia leave the language model out. Deepgram Standard includes a managed model. GPT-Live-1 leaves the backend model out. Vapi's bar is hosting only. LiveKit's bar is the agent-session overage after the plan's included minutes. [[1]][[2]][[9]][[11]][[12]][[18]][[20]]",
    unit: "USD per minute",
    source: "Vendor pricing pages, fetched November 11, 2026. [[1]][[2]][[9]][[11]][[12]][[18]][[20]]",
    series: ["Printed rate"],
    categories: [
      { label: "Bland Start", values: [0.14], displays: [usd(0.14, 2)] },
      { label: "ElevenLabs minute", values: [0.08], displays: [usd(0.08, 2)] },
      { label: "Deepgram Standard", values: [0.075], displays: [usd(0.075, 3)] },
      { label: "GPT-Live-1 session", values: [0.05], displays: [usd(0.05, 2)] },
      { label: "Vapi hosting only", values: [0.05], displays: [usd(0.05, 2)] },
      { label: "Cartesia agents", values: [0.03], displays: [usd(0.03, 2)] },
      { label: "LiveKit overage", values: [0.01], displays: [usd(0.01, 2)] },
    ],
  },
  {
    id: "framework-stars",
    title: "Pipecat leads LiveKit Agents by 2,020 stars",
    caption: `stargazers_count at 10:49 GMT on November 11, 2026. Pipecat ${num.format(pipecatStars)}. LiveKit Agents ${num.format(livekitStars)}. The gap is ${num.format(starGap)}. A star is a bookmark. The November 10 download census, which this page did not re-sum, ran the other way. [[14]][[15]][[21]]`,
    unit: "GitHub stars",
    source: "GitHub repository API, HTTP Date Wed, 11 Nov 2026 10:49:36 GMT. [[14]][[15]]",
    series: ["Stars"],
    categories: [
      { label: "pipecat-ai/pipecat", values: [pipecatStars], displays: [num.format(pipecatStars)] },
      { label: "livekit/agents", values: [livekitStars], displays: [num.format(livekitStars)] },
    ],
  },
];

const chapters: ReportChapter[] = [
  {
    id: "meters",
    title: "The published minute is seven different bills",
    blocks: [
      {
        kind: "p",
        text: "A voice-agent minute is a label vendors put on different stacks. One includes the language model. One is the session clock, silence included. One is hosting. One is the overage after a free allotment. Ranking them as a single price requires the column that says what was left out. The chart is that ranking with the caveat in the caption. The table is the number. [[1]][[2]][[9]][[11]][[12]][[18]][[20]]",
      },
      { kind: "chart", id: "published-minutes" },
      {
        kind: "table",
        caption: "Per-minute rates copied from vendor pricing pages on November 11, 2026. A blank model cell means the page did not print a dollar amount for it.",
        headers: ["Vendor", "What the printed minute is", "Rate", "Language model", "Phone, on their page"],
        rows: [
          [
            "[ElevenLabs Agents](https://elevenlabs.io/pricing/agents)",
            "Additional call minute, every plan from Free through Business",
            `${usd(0.08, 2)}. Burst ${usd(0.16, 2)}`,
            "Separate. 'Varies by model.' No dollar amount.",
            "At cost. Your carrier bills you. [[1]]",
          ],
          [
            "[Cartesia Managed Agents](https://www.cartesia.ai/pricing)",
            "Call duration. Page still prints previously $0.06.",
            usd(0.03, 2),
            "Separate",
            `${usd(0.014, 3)} a minute on a Cartesia number. [[11]]`,
          ],
          [
            "[Deepgram Voice Agent, standard](https://deepgram.com/pricing)",
            "Speech-to-text, a managed model, and speech. WebSocket time. Growth, at the lower rate, starts at $4,000 a year.",
            `${usd(0.075, 3)} pay as you go. ${usd(0.068, 3)} on Growth.`,
            "In the standard minute. Bring-your-own LLM and TTS is $0.050.",
            "Not in this rate. [[9]]",
          ],
          [
            "[OpenAI GPT-Live-1](https://developers.openai.com/api/docs/pricing)",
            "Session time, per second, including silence and backend waits.",
            usd(0.05, 2),
            "Backend model and tools, at their own rates.",
            "Not on the pricing table. [[2]][[4]]",
          ],
          [
            "[Vapi, no success package](https://vapi.ai/pricing)",
            "Hosting only.",
            usd(0.05, 2),
            `OpenAI ${usd(0.0077, 4)} to ${usd(0.0452, 4)}. Model name not printed.`,
            "Vapi SIP is $0. Twilio inbound $0.008, outbound $0.014. [[18]]",
          ],
          [
            "[Retell, pay as you go](https://www.retellai.com/pricing)",
            "Voice infra, plus a voice, plus the model you pick.",
            `${usd(0.055, 3)} infra. Platform voice ${usd(0.015, 3)}.`,
            `GPT 5.1 standard ${usd(0.04, 2)}. Fast tier ${usd(0.08, 2)}.`,
            "US Twilio default $0.015. Custom SIP no charge. Number $2 a month. [[19]]",
          ],
          [
            "[Bland Start](https://www.bland.ai/pricing)",
            "Talk time. Page says no token charges.",
            `${usd(0.14, 2)}, $0 platform fee`,
            "In the minute",
            "Separate, at pass-through. No carrier minute on this page. [[20]]",
          ],
          [
            "[LiveKit Cloud](https://livekit.com/pricing.md)",
            "Agent session minute after the included allotment.",
            `${usd(0.01, 2)} on Ship and Scale`,
            "Inference menu, priced per model.",
            "US inbound $0.01 after the allowance. Third-party SIP $0.004 on Ship. [[12]]",
          ],
        ],
      },
      {
        kind: "h3",
        text: "ElevenLabs sells concurrency, at a flat minute",
      },
      {
        kind: "p",
        text: `Additional minutes are ${usd(0.08, 2)} on Free, Starter, Creator, Pro, Scale, and Business. Included minutes run 15, 75, 275, 1,238, 3,738, and 12,375. Concurrent calls run 4, 6, 10, 20, 30, and 40. Monthly fees on the page are $0, $6 after a $1 first month, $22 after an $11 first month, $99, $299, and $990. Text messages are ${usd(0.003, 3)}. The FAQ says burst pricing lets agents handle up to three times the plan's concurrency at ${usd(0.16, 2)} a minute. The page does not say what happens past that ceiling. A worked bill for 1,000 and 10,000 three-minute calls, including the plan-fee arithmetic, is the [cost note](/blog/voice-ai-agent-cost-per-call-november-2026). This page does not repeat it. [[1]][[22]]`,
      },
      {
        kind: "h3",
        text: "OpenAI's two meters, in one minute of audio each way",
      },
      {
        kind: "p",
        text: `The cost guide says user-message audio is 1 token per 100 ms and assistant audio is 1 token per 50 ms. A minute of caller audio is ${callerTokensPerMinute} tokens. A minute of agent audio is ${num.format(agentTokensPerMinute)} tokens. The guide also says the entire conversation is sent on each response, so a later turn costs more than the first, and that voice activity detection filters empty input audio. The figures below are this page's multiplication for one minute of each, before that history and before the special tokens the guide says will move the count by a small amount. They are not an OpenAI invoice. [[2]][[4]]`,
      },
      {
        kind: "table",
        caption: "This page's arithmetic on OpenAI's published token rates and token durations, and Google's published per-minute equivalents added together. Not a call price.",
        headers: ["Model", "1 minute of caller audio", "1 minute of agent audio", "Those two minutes, before the next turn"],
        rows: [
          ["gpt-realtime-2.1", usd(realtimeIn, 4), usd(realtimeOut, 4), usd(realtimeBoth, 3)],
          ["gpt-realtime-2.1-mini", usd(miniIn, 4), usd(miniOut, 4), usd(miniBoth, 3)],
          [
            "Gemini 3.8 Live, the two per-minute equivalents added",
            usd(0.005, 3),
            usd(0.018, 3),
            `${usd(geminiAudioBoth, 3)}. Not a token sum. [[6]][[8]]`,
          ],
        ],
      },
      {
        kind: "p",
        text: `GPT-Live-1 stays on the session clock. ${usd(0.05, 2)} a minute, billed per second, with no round-up to a whole minute, and the backend model extra. A silent hold is billable on GPT-Live-1. On gpt-realtime-2.1, with voice activity detection on, empty input audio is not an input token unless the client adds it. Retell's speech-to-speech table, a third party's price for OpenAI's models, lists GPT Realtime 2.1 at ${usd(0.38, 2)} a minute and GPT-Live 1 plus the backend at ${usd(0.05, 2)}. That ${usd(0.38, 2)} is Retell's bundle. It is not the token arithmetic above. [[2]][[4]][[19]]`,
      },
      {
        kind: "callout",
        title: "The short bar is not the cheap call",
        text: `Vapi's low end of the printed ranges is hosting ${usd(0.05, 2)} plus Deepgram ${usd(0.0095, 4)} plus OpenAI ${usd(0.0077, 4)} plus ElevenLabs voice ${usd(0.0146, 4)}, which is ${usd(vapiLow, 4)} a minute. The high end of the same ranges is ${usd(vapiHigh, 4)}. The page does not name the model at either end. Retell's named stack of infra, a platform voice, and GPT 5.1 standard is ${usd(retellStack, 2)} before the phone. Use the named stack when the range will not say which model you will get. [[18]][[19]]`,
      },
      {
        kind: "p",
        text: `LiveKit's HTML calculator, on the phone-call toggle for Build/Ship, displayed ${usd(livekitShown, 4)} a minute. The lines were session ${usd(0.01, 2)}, telephony ${usd(0.01, 2)}, an LLM at ${usd(0.0014, 4)}, speech-to-text at ${usd(0.0075, 4)}, speech at ${usd(0.009, 4)}, and observability at ${usd(0.01, 2)}. They sum to the displayed total. The total row did not name the models. On the same page's per-minute lists, Gemma 4 31B is the only LLM at ${usd(0.0014, 4)}. Two AssemblyAI streaming models are at ${usd(0.0075, 4)}. AssemblyAI TTS 1 is at ${usd(0.009, 4)}. That is a match against the list. It is not a label the calculator printed. [[13]]`,
      },
      {
        kind: "means",
        audience: "Builders and buyers",
        text: "Write the quote as a stack: session or talk time, model, voice, phone, and the concurrency cap. A single per-minute number, without those five, is not a bid you can compare. Ask which model id is in the stack, and read its shutdown date before you sign.",
      },
    ],
  },
  {
    id: "architecture",
    title: "Speech-to-speech and the cascade are both on sale",
    blocks: [
      {
        kind: "p",
        text: "The architecture choice is which process owns the turn. A cascaded stack runs speech-to-text, then a language model, then text-to-speech, with a separate turn-taking model deciding when the caller has finished and when a barge-in should cut the agent off. A speech-to-speech model takes audio in and speaks audio out. Tool calls still have to land somewhere. OpenAI and ElevenLabs each sell both shapes. [[5]][[17]]",
      },
      {
        kind: "quote",
        text: "The key design choice is how speech connects to reasoning and tools: a continuous conversation with a separate backend, a single voice model, or a pipeline you control stage by stage.",
        cite: "OpenAI, Voice agents, fetched November 11, 2026. [[5]]",
      },
      {
        kind: "p",
        text: "OpenAI's guide names the three. GPT-Live is full duplex: the live model listens and speaks at the same time and delegates reasoning and tools to a backend, either your own agent or an OpenAI Responses model. The Realtime API puts speech, reasoning, and tool use in one session, and the session handles interruptions. The chained pipeline is speech-to-text, your agent, then text-to-speech, which is the path that lets you store the transcript and run a policy check before anyone speaks. The guide's example chained agent uses the model id gpt-6-astra. That id is a text model in the sample, not a voice rate. [[5]]",
      },
      {
        kind: "p",
        text: "ElevenLabs describes the same split from the other direction. ElevenAgents coordinates a speech-to-text model, a language model you choose, a text-to-speech model, and a proprietary turn-taking model. The overview says agents can also use a Realtime speech-to-speech model. Speech Engine is the orchestration layer for a team that already has a text agent. The Realtime models are also a standalone API, and the page points at an OpenAI Realtime wire-protocol compatibility guide. The overview says the text-to-speech model is low latency. It does not print a millisecond. [[17]]",
      },
      {
        kind: "h3",
        text: "Nobody published one end-to-end millisecond",
      },
      {
        kind: "p",
        text: "End-to-end latency is the wait from the end of the caller's turn to useful audio, including speech recognition, the model, tools, speech synthesis, and the network. The pages read for this brief do not publish that number on a shared method. OpenAI tells you to measure audible response latency at the median and the 95th percentile, with the caller, the recording, the backend model, the prompt, the transport, and the grader held fixed, and to time an acknowledgment such as 'I'm checking' separately from the answer. LiveKit's pricing card says the media transport delivers voice and video worldwide in under 250 ms. That sentence sits under media transport. It is not time-to-first-audio for the agent. Deepgram's acquisition post says Daily's network is engineered for ultra-low latency and cites 75 points of presence. Both phrases are Deepgram's. This page did not measure a call. [[5]][[10]][[12]]",
      },
      {
        kind: "p",
        text: "Turn-taking is a product surface with its own price on at least one rate card. LiveKit's markdown lists audio end-of-turn detection and adaptive interruption as free for agents hosted on LiveKit Cloud. Self-hosted agents get a development allowance and then pay, on Ship and Scale, $0.50 per 1,000 end-of-turn requests and $1.20 per 1,000 adaptive-interruption requests. The turn-detection doc says a realtime model with server-side turn detection decides the interruption itself, and that Gemini Live keeps turn-taking on its own signals, so this SDK's client-side interruption options do not apply. That sentence is LiveKit's account of Gemini. It is not a line this page found on Google's pricing or deprecations pages. [[12]][[16]]",
      },
      {
        kind: "h3",
        text: "Evals are a line item, when a vendor prices them",
      },
      {
        kind: "p",
        text: "OpenAI's guide says to score task completion, tool arguments, interruptions, unwanted silence, and incomplete sessions separately, and to move from synthetic single turns to recorded human speech to a simulated multi-turn caller. It points at a cookbook. It does not print a price for the eval. LiveKit does. On Ship and Scale, text simulations are $0.02 a turn and audio simulations are $0.05 a turn. Build includes 350 text turns and 60 audio turns. Cartesia's pricing page says evaluations are free of charge for a limited time only, and it does not name the end date. A limited-time free eval is a watch item, not a permanent zero. [[5]][[11]][[12]]",
      },
      {
        kind: "means",
        audience: "Builders",
        text: "Pick the path that matches what you must inspect. If a policy check has to see the words before they are spoken, use the cascade and budget the turn-taking model. If the caller must talk over a tool call, read the full-duplex page and budget the backend as a second meter. Record p50 and p95 of audible response latency on your own calls. A vendor sentence that says low latency, without a method, is not that number.",
      },
    ],
  },
  {
    id: "frameworks",
    title: "Pipecat leads stars. The description still says Daily.",
    blocks: [
      {
        kind: "p",
        text: `Deepgram announced on October 29, 2026 that it is acquiring Daily, the company that makes Pipecat. The post says the framework stays open source and free under its existing BSD V2 license, that an independent Pipecat Foundation is being established, and that the Daily team joins Deepgram. It also introduces a Real-Time Context Standard, co-developed with Pipecat, and says a Voice Agent Platform is forthcoming. The post tells readers to get in touch for platform updates. It does not name a general-availability day. This page did not fetch the standard's specification file. [[10]]`,
      },
      {
        kind: "quote",
        text: "Keeping Pipecat open was fundamental to our decision to join Deepgram.",
        cite: "Kwindla Hultman Kramer, co-founder of Daily, quoted in Deepgram's October 29, 2026 announcement. [[10]]",
      },
      { kind: "chart", id: "framework-stars" },
      {
        kind: "table",
        caption: "GitHub repository API and the first page of each releases API, November 11, 2026, about 10:49 GMT.",
        headers: ["Repository", "Stars", "Forks", "Latest release", "Published", "License on the API", "Description"],
        rows: [
          [
            "[livekit/agents](https://github.com/livekit/agents)",
            num.format(livekitStars),
            num.format(livekitForks),
            "livekit-agents@1.8.11",
            "2026-11-05",
            "Apache-2.0",
            "A framework for building realtime voice AI agents. [[14]]",
          ],
          [
            "[pipecat-ai/pipecat](https://github.com/pipecat-ai/pipecat)",
            num.format(pipecatStars),
            num.format(pipecatForks),
            "v1.15.0",
            "2026-10-29",
            "BSD-2-Clause",
            "The API text still says maintained by Daily and the community. [[15]]",
          ],
        ],
      },
      {
        kind: "p",
        text: `The gap is ${num.format(starGap)} stars, Pipecat ahead. LiveKit has ${num.format(livekitForks - pipecatForks)} more forks. Pipecat's latest release, v1.15.0, was published at 05:50 UTC on October 29, the same calendar day as the acquisition post. LiveKit's latest release, 1.8.11, was published November 5, six days before this check. The repository description on Pipecat still reads "Maintained by Daily and the community." Thirteen days after the announcement, the API field had not been updated. The license field is SPDX BSD-2-Clause, which matches the announcement's "BSD V2" in name. This page did not diff the LICENSE file. [[10]][[14]][[15]]`,
      },
      {
        kind: "p",
        text: "Stars and downloads disagreed the day before. This site's November 10 census, which this page did not re-sum, counted 4,583,195 PyPI downloads without mirrors for livekit-agents and 1,468,981 for pipecat-ai from October 10 through November 8. That morning's stars were 15,161 and 17,168. The install leader was LiveKit. The star leader was Pipecat, and it still is, by a slightly wider gap. A download is a file request. A star is a bookmark. Deepgram's post calls Pipecat the world's most popular open-source voice agent framework. That is Deepgram's sentence. The counts above are the ones this site pulled. The census is [LiveKit Agents had 4,583,195 downloads](/research/livekit-agents-vs-pipecat-installs-november-2026). [[15]][[21]]",
      },
      {
        kind: "callout",
        title: "The framework is free. The minute is not.",
        text: "Pipecat's license price is zero on the announcement and on the SPDX field. Running it still requires a model, a transport, and, for a phone call, a SIP trunk. LiveKit Cloud prices the session, the inference, and the trunk separately, and includes turn detection when LiveKit hosts the agent. Self-hosting moves that turn-detection line onto the request meter. [[10]][[12]]",
      },
      {
        kind: "means",
        audience: "Builders",
        text: "Pin the release you tested. For LiveKit Agents that is 1.8.11 as of this check. For Pipecat it is v1.15.0. Treat the October 29 post as the ownership record and the GitHub description as stale until the API text changes. Do not rewrite a working cascade because the banner on Deepgram's site changed.",
      },
    ],
  },
  {
    id: "phone",
    title: "The phone line is its own meter",
    blocks: [
      {
        kind: "p",
        text: "A voice agent that never leaves the browser is a WebRTC session. A voice agent that rings a handset needs a phone number and a SIP trunk, or the vendor's own telephony. Those charges are small next to a talkative model and large next to a careless comparison, because some stickers include them and some tell you the carrier will bill you directly. [[1]][[12]][[18]][[19]][[20]]",
      },
      {
        kind: "table",
        caption: "Telephony lines copied from the vendor's own page on November 11, 2026. Retell's country rates are the option values in the pricing-table select. The displayed default was United States (Twilio) at $0.015. This check did not change the selection.",
        headers: ["Vendor", "Their telephony", "A number", "Bring your own trunk"],
        rows: [
          ["ElevenLabs", "No ElevenLabs telephony fee. The word on the page is at cost.", "Not priced", "Your carrier bills you. The overview documents a SIP trunk. [[1]][[17]]"],
          ["Vapi", "Vapi telephony and SIP: $0", "1 included on the usage package", "Twilio inbound $0.008, outbound $0.014. Vonage $0.00814. Telnyx $0.0055. [[18]]"],
          ["Retell", "US Twilio $0.015 a minute, the default option", "$2 a month. Custom numbers no charge.", "SIP trunking and custom telephony: no charge, on the pricing table. [[19]]"],
          ["Bland", "Pass-through. No carrier minute on the marketing page.", "Start includes an inbound number, described as a $15 a month value", "The page says yes, including your Twilio account or any SIP trunk. [[20]]"],
          ["Cartesia", "$0.014 a minute on a Cartesia-provided number", "1, 3, 5, or 10 numbers by plan", "Not given a separate bring-your-own rate on the pricing page. [[11]]"],
          ["LiveKit Cloud", "US local inbound $0.01 a minute after the allowance", "1 free US local number, then $1 a month", "Third-party SIP: 5,000 minutes on Ship then $0.004. Scale then $0.003. [[12]]"],
          ["Deepgram Voice Agent", "No phone rate on the Voice Agent price table", "Not priced there", "The pricing page does not print a SIP minute. [[9]]"],
        ],
      },
      {
        kind: "p",
        text: "LiveKit's included SIP minutes are 1,000 on Build, 5,000 on Ship, and 50,000 on Scale. US local inbound minutes are a thinner allowance: 50, 100, and 1,000, then $0.01. A toll-free inbound minute on Ship and Scale is $0.02, and the number is $2 a month. Concurrent agent sessions are 5 on Build, 20 on Ship, and up to 600 on Scale, starting at 50. Those caps are the production limit a pilot does not see. ElevenLabs buys the same thing with the plan: 4 concurrent calls on Free, 40 on Business, and a burst rate rather than a hard stop the page is willing to describe. Bland Start stops at 100 calls a day and 10 concurrent. The page says the cap is the cap. [[1]][[12]][[20]]",
      },
      {
        kind: "p",
        text: "Retell's add-ons sit on top of the stack and are easy to omit from a pilot quote. A knowledge base is an extra $0.005 a minute. Batch calling is $0.005 a dial. Branded calling is $0.10 an outbound call. Advanced denoising, safety guardrails, and PII removal are $0.005 a minute each. The first 20 concurrent calls are included, then $8 a concurrent call a month. None of that is in the $0.11 named stack. [[19]]",
      },
      {
        kind: "means",
        audience: "Buyers",
        text: "Ask for the SIP line and the concurrency cap in the same sentence as the minute rate. A quote that says telephony is at cost, without the carrier's rate, is unfinished. A quote that includes US Twilio at one vendor's $0.015 and pastes that rate onto ElevenLabs or Bland is using the wrong invoice.",
      },
    ],
  },
  {
    id: "outlook",
    title: "What is dated from November 2026 through May 2027",
    blocks: [
      {
        kind: "p",
        text: "Announced means a linked vendor page names the day. Likely means a document aims the work at that month and does not lock the day. Watch means a later check should confirm the item or drop it. A month with no dated voice-agent event stays empty in the announced column. The [general six-month outlook](/reports/ai-agents-next-6-months) covers product filings and regulation. This table is voice agents only. [[3]][[7]][[9]]",
      },
      {
        kind: "table",
        caption: "Announced, likely, and watch-for notes by month, November 2026 through May 2027. Read November 11, 2026.",
        headers: ["Month", "Announced", "Likely", "Watch for"],
        rows: months.map((item) => [item.month, item.announced, item.likely, item.watch]),
      },
      {
        kind: "h3",
        text: "Announced",
      },
      {
        kind: "p",
        text: "November 17, 2026 is the earliest date Google prints for two Live API preview models, gemini-3.1-flash-live-preview (released March 11, 2026) and gemini-2.5-flash-native-audio-preview-12-2025 (released December 12, 2025). The recommended replacement on both rows is gemini-3.8-live, released September 15, 2026, with no shutdown date on the stable Live API table. The same earliest date is on gemini-3.1-flash-tts-preview, a text-to-speech preview, replaced by gemini-3.8-flash-tts or gemini-3.8-flash-lite-tts. The page's note applies to the whole set of tables: the shutdown column is the earliest a model might be retired, and Google says it will communicate the exact day. Six days after this check is the earliest, not a confirmed off switch. [[7]]",
      },
      {
        kind: "p",
        text: "The price of that move, on the audio rates Google prints, does not change for the 3.1 Flash Live preview. The pricing page puts gemini-3.8-live, gemini-3.8-live-extended-thinking, and gemini-3.1-flash-live-preview on one paid table: $3.00 per million audio input tokens or $0.005 a minute, and $12.00 per million audio output tokens or $0.018 a minute. The older native-audio preview is a separate block at the same $3.00 and $12.00 token rates, without the per-minute equivalents printed beside them. Migrating the preview id is a model-id change. It is not, on these tables, a new audio rate. [[6]][[7]]",
      },
      {
        kind: "p",
        text: "January is firmer because OpenAI states a removal day, not an earliest day. On January 6, 2027, tts-1, tts-1-hd, and gpt-4o-mini-tts leave the API. The recommended replacement in that section is gpt-realtime-2.1-mini, which is a realtime model, not a drop-in text-to-speech endpoint. On January 20, 2027, gpt-realtime, the August 28, 2025 snapshot, gpt-4o-realtime, gpt-realtime-mini, the December 15, 2025 mini snapshot, and gpt-4o-mini-realtime leave. Replacements are gpt-realtime-2.1 and gpt-realtime-2.1-mini. The same January 20 table also removes gpt-audio, gpt-4o-audio, and the mini audio ids. Developers were notified July 20, 2026. The pricing page still lists the models being removed, at the older audio rates of $32 and $64, or $10 and $20 for the minis. The rate card has not dropped the ids ahead of the shutdown. [[2]][[3]]",
      },
      {
        kind: "p",
        text: "December 31, 2026 is the other printed day, and it is a credit, not a voice-agent price. Deepgram gives $1 of Flux text-to-speech credits per $1 spent, up to $500, through that date. The Voice Agent rates beside it have no end date. ElevenAgents Campaign Manager, published November 9, is already in the past relative to this check. The docs page this site read on November 10 did not add a separate fee. The product note is [What is ElevenAgents Campaign Manager?](/blog/what-is-elevenagents-campaign-manager). [[9]]",
      },
      {
        kind: "h3",
        text: "Likely",
      },
      {
        kind: "p",
        text: "Likely, in the sense this site uses on the other outlooks, is a document that aims work at a month inside the window and does not lock the day. No page in this set does that for a voice agent. Deepgram's October 29 post says the Voice Agent Platform is forthcoming and points readers at a contact form. Forthcoming is not March, and it is not May. Cartesia's free evaluations have no end date, so they are not a likely expiration in a named month. This column stays empty on purpose. [[10]][[11]]",
      },
      {
        kind: "h3",
        text: "Watch for",
      },
      {
        kind: "p",
        text: "Watch Google's exact-date notice for the two Live previews. If November 17 passes and the ids still answer, the table did what it said it might do: it named the earliest day, not the day. Watch January 6 and January 20 on OpenAI, which are removal days, not earliest days. Watch whether Deepgram publishes a platform date, whether the Pipecat GitHub description drops the word Daily, and whether any minute in the rate table grows an effective date. Enterprise contact-center contracts from vendors this brief did not open, including Genesys, NICE, Five9, Amazon Connect, and Google Contact Center AI, are not in the watch list because no public rate card from them was read. A private price is not a blank this page can fill. [[3]][[7]][[10]][[15]]",
      },
      {
        kind: "means",
        audience: "Builders and buyers",
        text: "Put November 17 on the calendar as the earliest day two Gemini Live preview ids can go, and January 6 and January 20 as the days the named OpenAI ids are scheduled to go. Leave the minute rates alone until a pricing page grows a date. Do not budget a Deepgram platform migration inside this window until the post that says forthcoming grows a day.",
      },
    ],
  },
  {
    id: "what-to-do",
    title: "What this means for builders and buyers",
    blocks: [
      {
        kind: "p",
        text: "The work between November 11, 2026 and May 2027 is a migration of model ids and a cleanup of quotes. It is not a wait for a cheaper minute. The pages that publish a minute did not publish a day when it changes. The pages that publish a day are shutting model ids down. [[1]][[3]][[7]]",
      },
      {
        kind: "p",
        text: "Builders on gemini-3.1-flash-live-preview or gemini-2.5-flash-native-audio-preview-12-2025 should move the id to gemini-3.8-live before they need the exact-date email. The audio token rates on the shared 3.8 table match the preview's token rates. The per-minute equivalents are printed on the 3.8 block. Builders on tts-1 or gpt-4o-mini-tts should read the January 6 replacement as a product change: the named replacement is gpt-realtime-2.1-mini. Builders on gpt-realtime, gpt-4o-realtime, or gpt-realtime-mini should move to gpt-realtime-2.1 or the mini before January 20. The audio rates of the 2.1 pair, $32 and $64 or $10 and $20 per million, match the rates still printed for the ids that are leaving. The bill changes shape if the call pattern changes. The list price of a token, on this card, does not. [[2]][[3]][[6]][[7]]",
      },
      {
        kind: "p",
        text: "Builders choosing a stack should write down who owns turn-taking and who owns the tool call. A cascade lets you read the transcript and reject a tool call before speech goes out. Full duplex lets the caller talk while the backend works, and the backend is a second meter on GPT-Live-1. A realtime session hides the boundary and bills tokens that grow with the history. LiveKit will host the turn detector for free and charge for it if you self-host past the allowance. ElevenLabs will sell you the cascade, with its own turn-taking model, or a Realtime model inside the same agent product, at the same $0.08 voice minute, with the LLM still extra. [[1]][[5]][[12]][[17]]",
      },
      {
        kind: "p",
        text: "Buyers should ask four questions and refuse a quote that answers with one number. Which model id, and what does the vendor's deprecations page say about it? Which of the seven minutes in the chart is the quoted minute, and where are the model, the voice, and the phone? What is the concurrency cap, and is the overage a higher minute, a rejected call, or a $10 line? Who pays for the eval, per turn or per minute, after the pilot? The [1,000-call worksheet](/blog/voice-ai-agent-cost-per-call-november-2026) is the invoice arithmetic for ElevenLabs, Vapi, Retell, and Bland. The [ElevenLabs directory listing](/directory/elevenlabs) is the product page. The general agent calendar is the [six-month outlook](/reports/ai-agents-next-6-months). [[1]][[5]][[22]]",
      },
      {
        kind: "p",
        text: "Framework buyers have a narrower job. Pin livekit-agents 1.8.11 or pipecat 1.15.0, or a newer tag you have read. Keep Pipecat if the BSD terms on the repository still match the October 29 promise when you next review the license. Do not treat 17,194 stars as evidence the framework places the call, and do not treat 4,583,195 downloads as evidence it is cheap to run. Both numbers are real. Neither one is a minute rate. [[14]][[15]][[21]]",
      },
      {
        kind: "means",
        audience: "Builders and buyers",
        text: "Migrate the preview and legacy model ids on the dates above. Compare stacks only after the model, the voice, the phone, and the concurrency cap are written down. Treat November 17 as an earliest day and January 20 as a removal day. The $0.08 minute can wait.",
      },
    ],
  },
  {
    id: "methodology",
    title: "Methodology",
    blocks: [
      {
        kind: "p",
        text: "This page did not field a survey, recruit a panel, interview vendors, place a call, or charge a card. It copies public pages and APIs and labels every arithmetic step. There is no hidden sample of practitioners and no measured latency of our own.",
      },
      {
        kind: "h3",
        text: "What was counted",
      },
      {
        kind: "p",
        text: `Prices, plan fees, concurrency caps, and telephony rates are strings from the vendor pages listed in the sources, fetched November 11, 2026. The HTTP Date or response Date is in the source line. Vapi's response Date is November 10, from a cache HIT. Retell's Last-Modified is November 7. GitHub figures are stargazers_count, forks_count, license.spdx_id, pushed_at, and the latest release's published_at. ${num.format(pipecatStars)} minus ${num.format(livekitStars)} is ${num.format(starGap)}. OpenAI audio minutes use 60 divided by 0.1 seconds, which is ${callerTokensPerMinute} caller tokens, and 60 divided by 0.05 seconds, which is ${num.format(agentTokensPerMinute)} agent tokens, times the per-million rate. ${callerTokensPerMinute} times $32 per million is ${usd(realtimeIn, 4)}. ${num.format(agentTokensPerMinute)} times $64 per million is ${usd(realtimeOut, 4)}. The sum is ${usd(realtimeBoth, 3)}. The mini pair sums to ${usd(miniBoth, 3)}. Vapi's low end sums to ${usd(vapiLow, 4)}. The high end sums to ${usd(vapiHigh, 4)}. Retell's named stack sums to ${usd(retellStack, 2)}. LiveKit's six displayed lines sum to ${usd(livekitShown, 4)}. [[2]][[4]][[13]][[14]][[15]][[18]][[19]]`,
      },
      {
        kind: "h3",
        text: "What a word means",
      },
      {
        kind: "p",
        text: "Announced means the linked page names a day. Likely means the linked page aims the work at that month without a day. No page in this set did that, so the likely column says so. Watch means the next check should confirm or drop the item. Earliest possible, on the Gemini table, is Google's phrase, and this page keeps it. A vendor sentence that says low latency or ultra-low latency is quoted as a vendor sentence. It is not converted into a millisecond.",
      },
      {
        kind: "h3",
        text: "What this does not measure",
      },
      {
        kind: "p",
        text: "It does not measure end-to-end latency, task success, barge-in accuracy, or answer quality. It did not re-sum the PyPI downloads in the November 10 census. It did not open Genesys, NICE, Five9, Amazon Connect, Google Contact Center AI, Sierra, or Decagon rate cards, so enterprise contact-center contracts are outside the table. It did not open Bland's billing doc, so the Scale plan that doc carries is not a row here. It did not switch Retell's country dropdown. US Twilio is the first option, value 0.015, and the span next to the select displayed 0.015. It did not fetch the Real-Time Context Standard specification, ElevenLabs' standalone Realtime price if it differs from the Agents page, or a Gemini shutdown email. The deprecations fetch followed a redirect to AI Studio. The shutdown table was in that response. [[7]][[19]][[20]][[21]]",
      },
      {
        kind: "p",
        text: "Forward-looking cells stay labeled. A month stays empty when no source names it. Deepgram's claim that Pipecat is the most popular open-source voice framework is their claim. The star counts are the API's. If you cite a number from this page, cite the source number and the clock time.",
      },
      {
        kind: "means",
        audience: "Builders and buyers",
        text: "The evidence is the pages and the two GitHub responses. The judgment is the sorting: November 17 is an earliest day, January 20 is a removal day, and the hosted minute rates have no day at all.",
      },
    ],
  },
];

export { chapters };
