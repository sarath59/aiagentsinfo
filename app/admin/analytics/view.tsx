import type { AgentKind } from "@/lib/analytics/classify";
import type { AnalyticsSummary, Rank } from "@/lib/analytics/summary";

const KIND_LABEL: Record<AgentKind, string> = {
  human: "Humans",
  search: "Search crawlers",
  ai_training: "AI training crawlers",
  ai_search: "AI search and answer bots",
  ai_user: "AI user agents",
  bot: "Other bots",
};

const KIND_COLOR: Record<AgentKind, string> = {
  human: "#0c5cad",
  search: "#0c746e",
  ai_training: "#e0b04a",
  ai_search: "#2f9dff",
  ai_user: "#123456",
  bot: "#8aa0b5",
};

const number = new Intl.NumberFormat("en-US");

export function AnalyticsView({ summary }: { summary: AnalyticsSummary }) {
  const today = summary.today;
  const goalPct = Math.round(today.visitProgress * 1000) / 10;
  const peak = Math.max(...summary.days.map((day) => day.sessions), 1);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20">
      <header className="pb-8 pt-14">
        <p className="kicker kicker-lead">Private</p>
        <h1 className="display mt-3 text-4xl sm:text-5xl">Analytics</h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[var(--muted)]">
          First-party counts for the public site. A visit is one browser session. Days are UTC. Updated {summary.generatedAt.slice(0, 16).replace("T", " ")} UTC.
        </p>
      </header>

      {summary.env.notes.length ? <Setup notes={summary.env.notes} storage={summary.storage} /> : null}

      <section className="glass rounded-3xl p-5 sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="kicker">Visits today</p>
            <p className="mt-2 text-3xl font-semibold tabular-nums">
              {number.format(today.visits)}
              <span className="ml-2 text-base font-medium text-[var(--muted)]">of {number.format(summary.visitGoal)}</span>
            </p>
          </div>
          <p className="text-sm text-[var(--muted)]">{goalPct}% of the daily goal</p>
        </div>
        <div
          className="analytics-track mt-4"
          role="progressbar"
          aria-label="Visits today toward 5,000"
          aria-valuemin={0}
          aria-valuemax={summary.visitGoal}
          aria-valuenow={today.visits}
        >
          <span style={{ width: `${Math.min(100, today.visitProgress * 100)}%` }} />
        </div>
      </section>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Visitors today" value={number.format(today.visitors)} hint="Distinct browser ids" />
        <Stat label="Pageviews today" value={number.format(today.pageviews)} hint="Tracker page loads" />
        <Stat label="Sessions today" value={number.format(today.sessions)} hint="Same number as visits" />
        <Stat label="Live" value={number.format(summary.live.visitors)} hint="Active in the last 30 minutes" />
      </div>

      <section className="glass mt-4 rounded-3xl p-5 sm:p-6">
        <h2 className="text-lg font-semibold">Visitors, pageviews, and sessions</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">Last {summary.windowDays} UTC days. Bars show sessions.</p>
        <div className="mt-5 flex items-end gap-2 overflow-x-auto">
          {[...summary.days].reverse().map((day) => (
            <div key={day.day} className="flex min-w-14 flex-1 flex-col items-center gap-2">
              <span className="text-xs tabular-nums text-[var(--muted)]">{number.format(day.sessions)}</span>
              <div className="flex h-28 w-full items-end">
                <span
                  className="analytics-col"
                  style={{ height: `${Math.max(4, Math.round((day.sessions / peak) * 100))}%` }}
                  title={`${day.day}: ${day.visitors} visitors, ${day.pageviews} pageviews, ${day.sessions} sessions`}
                />
              </div>
              <span className="text-[11px] text-[var(--muted)]">{day.day.slice(5)}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-[var(--muted)]">
              <tr>
                <th className="py-2 font-medium">Day</th>
                <th className="py-2 text-right font-medium">Visitors</th>
                <th className="py-2 text-right font-medium">Pageviews</th>
                <th className="py-2 text-right font-medium">Sessions</th>
              </tr>
            </thead>
            <tbody>
              {summary.days.map((day) => (
                <tr key={day.day} className="border-t border-[var(--stroke)]">
                  <td className="py-2">{day.day}</td>
                  <td className="py-2 text-right tabular-nums">{number.format(day.visitors)}</td>
                  <td className="py-2 text-right tabular-nums">{number.format(day.pageviews)}</td>
                  <td className="py-2 text-right tabular-nums">{number.format(day.sessions)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Pages rows={summary.topPages} />
        <Simple
          title="Where people stopped"
          hint="Last heading or section in view when they left."
          rows={summary.exits.map((row) => ({
            label: `${row.path} · ${row.section}`,
            count: row.count,
          }))}
        />
        <Simple
          title="Countries"
          rows={summary.countries.map((row) => ({ label: row.name === row.code ? row.name : `${row.name} (${row.code})`, count: row.count }))}
        />
        <Simple title="Cities" rows={summary.cities} />
        <Simple title="Devices" rows={summary.devices} />
        <Simple title="Browsers" rows={summary.browsers} />
        <Simple title="Operating systems" rows={summary.operatingSystems} />
        <Simple title="Screens" rows={summary.screens} />
        <Simple title="Languages" rows={summary.languages} />
        <Simple title="Referrers" hint="Tracker pageviews. The landing page of a session gets the referrer." rows={summary.referrers} />
        <Utm rows={summary.utm} />
        <Simple title="Outbound links" rows={summary.outbound} />
        <Simple title="PDF downloads" rows={summary.downloads} />
        <Scroll rows={summary.scrollMilestones} newsletter={today.newsletter} />
      </div>

      <BotSplit summary={summary} />
      <AiBreakdown summary={summary} />
      <Live summary={summary} />

      <p className="mt-6 text-sm text-[var(--muted)]">
        JSON for the same window: <code>/api/analytics/summary?key=…</code>. Add <code>&days=30</code> for a longer window, up to 30 days.
        {summary.env.ipSalt ? " Unique networks use the daily IP hash." : " Unique network counts stay at zero until ANALYTICS_IP_SALT is set."}{" "}
        {today.networks ? `${number.format(today.networks)} networks today.` : ""}
      </p>
    </div>
  );
}

function Setup({ notes, storage }: { notes: string[]; storage: AnalyticsSummary["storage"] }) {
  return (
    <section className="mb-4 rounded-3xl border border-[color-mix(in_oklab,var(--gold-bright)_55%,white)] bg-[color-mix(in_oklab,var(--gold-bright)_16%,white)] p-5 sm:p-6">
      <h2 className="text-lg font-semibold">Storage {storage === "upstash" ? "is connected" : "is not configured yet"}</h2>
      <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
        Counts stay empty until the Redis REST store is set. In Vercel, open the project, then Settings, then Environment Variables, add the variables below for Production, and redeploy.
      </p>
      <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed">
        <li>Create a free Redis database at console.upstash.com, or add the Upstash integration from the Vercel storage marketplace.</li>
        <li>
          <code>UPSTASH_REDIS_REST_URL</code> and <code>UPSTASH_REDIS_REST_TOKEN</code>. A Vercel KV database can use <code>KV_REST_API_URL</code> and <code>KV_REST_API_TOKEN</code> instead.
        </li>
        <li>
          <code>ANALYTICS_ADMIN_KEY</code>, a long random string. It unlocks this page and <code>/api/analytics/summary</code>.
        </li>
        <li>
          <code>ANALYTICS_IP_SALT</code>, a different long random string. It salts the daily network hash. The raw IP is never stored.
        </li>
      </ol>
      <ul className="mt-3 space-y-1 text-sm">
        {notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
    </section>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <section className="glass rounded-3xl p-5">
      <p className="kicker">{label}</p>
      <p className="mt-2 text-3xl font-semibold tabular-nums">{value}</p>
      <p className="mt-1 text-sm text-[var(--muted)]">{hint}</p>
    </section>
  );
}

function Pages({ rows }: { rows: AnalyticsSummary["topPages"] }) {
  return (
    <section className="glass rounded-3xl p-5 lg:col-span-2">
      <h2 className="text-lg font-semibold">Top pages</h2>
      <p className="mt-1 text-sm text-[var(--muted)]">Average engaged time counts only while the tab is visible. Scroll depth is the max bucket reached: 0, 25, 50, 75, or 100.</p>
      {rows.length === 0 ? (
        <p className="mt-4 text-sm text-[var(--muted)]">Nothing recorded yet.</p>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-[var(--muted)]">
              <tr>
                <th className="py-2 font-medium">Page</th>
                <th className="py-2 text-right font-medium">Pageviews</th>
                <th className="py-2 text-right font-medium">Avg engaged</th>
                <th className="py-2 text-right font-medium">Avg scroll</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.path} className="border-t border-[var(--stroke)]">
                  <td className="max-w-[28rem] truncate py-2 pr-3">{row.path}</td>
                  <td className="py-2 text-right tabular-nums">{number.format(row.pageviews)}</td>
                  <td className="py-2 text-right tabular-nums">{duration(row.avgEngagedMs)}</td>
                  <td className="py-2 text-right tabular-nums">{row.scrollSamples ? `${row.avgScrollDepth}%` : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

function Simple({ title, hint, rows }: { title: string; hint?: string; rows: Rank[] }) {
  const max = rows.reduce((peak, row) => Math.max(peak, row.count), 0) || 1;
  return (
    <section className="glass rounded-3xl p-5">
      <h2 className="text-lg font-semibold">{title}</h2>
      {hint ? <p className="mt-1 text-sm text-[var(--muted)]">{hint}</p> : null}
      {rows.length === 0 ? (
        <p className="mt-4 text-sm text-[var(--muted)]">Nothing recorded yet.</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {rows.map((row) => (
            <li key={row.label}>
              <div className="flex items-baseline justify-between gap-3 text-sm">
                <span className="truncate">{row.label}</span>
                <span className="tabular-nums text-[var(--muted)]">{number.format(row.count)}</span>
              </div>
              <span className="analytics-track mt-1 block">
                <span style={{ width: `${Math.max(4, Math.round((row.count / max) * 100))}%` }} />
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function Utm({ rows }: { rows: AnalyticsSummary["utm"] }) {
  return (
    <section className="glass rounded-3xl p-5 lg:col-span-2">
      <h2 className="text-lg font-semibold">Campaigns</h2>
      <p className="mt-1 text-sm text-[var(--muted)]">utm_source, utm_medium, utm_campaign, utm_term, and utm_content from the landing page.</p>
      {rows.length === 0 ? (
        <p className="mt-4 text-sm text-[var(--muted)]">Nothing recorded yet.</p>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-[var(--muted)]">
              <tr>
                <th className="py-2 font-medium">Source</th>
                <th className="py-2 font-medium">Medium</th>
                <th className="py-2 font-medium">Campaign</th>
                <th className="py-2 font-medium">Term</th>
                <th className="py-2 font-medium">Content</th>
                <th className="py-2 text-right font-medium">Visits</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={`${row.source}|${row.medium}|${row.campaign}|${row.term}|${row.content}`} className="border-t border-[var(--stroke)]">
                  <td className="py-2 pr-3">{row.source}</td>
                  <td className="py-2 pr-3">{row.medium}</td>
                  <td className="py-2 pr-3">{row.campaign}</td>
                  <td className="py-2 pr-3">{row.term}</td>
                  <td className="py-2 pr-3">{row.content}</td>
                  <td className="py-2 text-right tabular-nums">{number.format(row.count)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

function Scroll({ rows, newsletter }: { rows: AnalyticsSummary["scrollMilestones"]; newsletter: number }) {
  return (
    <section className="glass rounded-3xl p-5">
      <h2 className="text-lg font-semibold">Scroll and newsletter</h2>
      <p className="mt-1 text-sm text-[var(--muted)]">Milestone counts are how many page views reached each depth. Newsletter submits today: {number.format(newsletter)}.</p>
      <ul className="mt-4 space-y-2 text-sm">
        {rows.map((row) => (
          <li key={row.depth} className="flex justify-between border-t border-[var(--stroke)] py-2">
            <span>{row.depth}%</span>
            <span className="tabular-nums">{number.format(row.count)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function BotSplit({ summary }: { summary: AnalyticsSummary }) {
  const order: AgentKind[] = ["human", "search", "ai_training", "ai_search", "ai_user", "bot"];
  const total = summary.botHuman.total || 1;
  return (
    <section className="glass mt-4 rounded-3xl p-5 sm:p-6">
      <h2 className="text-lg font-semibold">Bots and humans</h2>
      <p className="mt-1 text-sm text-[var(--muted)]">
        Full document requests seen by the server, including crawlers that never run JavaScript. Last {summary.windowDays} days. {number.format(summary.botHuman.total)} requests.
      </p>
      <div className="mt-4 flex h-3 overflow-hidden rounded-full bg-[color-mix(in_oklab,var(--color-navy)_8%,white)]">
        {order.map((kind) =>
          summary.botHuman[kind] ? (
            <span key={kind} style={{ width: `${(summary.botHuman[kind] / total) * 100}%`, background: KIND_COLOR[kind] }} />
          ) : null,
        )}
      </div>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {order.map((kind) => (
          <li key={kind} className="flex items-center justify-between gap-3 text-sm">
            <span className="flex items-center gap-2">
              <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: KIND_COLOR[kind] }} />
              {KIND_LABEL[kind]}
            </span>
            <span className="tabular-nums">{number.format(summary.botHuman[kind])}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function AiBreakdown({ summary }: { summary: AnalyticsSummary }) {
  return (
    <div className="mt-4 grid gap-4 lg:grid-cols-2">
      <section className="glass rounded-3xl p-5">
        <h2 className="text-lg font-semibold">Crawlers and agents</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">Named bots on document requests.</p>
        {summary.bots.length === 0 ? (
          <p className="mt-4 text-sm text-[var(--muted)]">Nothing recorded yet.</p>
        ) : (
          <ul className="mt-4 space-y-2 text-sm">
            {summary.bots.map((row) => (
              <li key={`${row.kind}-${row.name}`} className="flex justify-between gap-3 border-t border-[var(--stroke)] py-2">
                <span>
                  {row.name} <span className="text-[var(--muted)]">· {KIND_LABEL[row.kind]}</span>
                </span>
                <span className="tabular-nums">{number.format(row.count)}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
      <section className="glass rounded-3xl p-5">
        <h2 className="text-lg font-semibold">AI bots by URL</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">Training crawlers, answer bots, and user agents fetching for someone.</p>
        {summary.aiByUrl.length === 0 ? (
          <p className="mt-4 text-sm text-[var(--muted)]">Nothing recorded yet.</p>
        ) : (
          <ul className="mt-4 space-y-2 text-sm">
            {summary.aiByUrl.map((row) => (
              <li key={`${row.kind}-${row.bot}-${row.path}`} className="border-t border-[var(--stroke)] py-2">
                <span className="flex justify-between gap-3">
                  <span className="truncate">
                    {row.bot} <span className="text-[var(--muted)]">{row.path}</span>
                  </span>
                  <span className="tabular-nums">{number.format(row.count)}</span>
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
      <Simple title="AI referral traffic" hint="Document loads referred by ChatGPT, Perplexity, Claude, Gemini, or Copilot." rows={summary.aiReferrals} />
      <Simple
        title="AI referrals by URL"
        rows={summary.aiReferralUrls.map((row) => ({ label: `${row.source} → ${row.path}`, count: row.count }))}
      />
    </div>
  );
}

function Live({ summary }: { summary: AnalyticsSummary }) {
  return (
    <section className="glass mt-4 rounded-3xl p-5 sm:p-6">
      <h2 className="text-lg font-semibold">Live visitors</h2>
      <p className="mt-1 text-sm text-[var(--muted)]">{number.format(summary.live.visitors)} in the last {summary.live.windowMinutes} minutes.</p>
      {summary.live.rows.length === 0 ? (
        <p className="mt-4 text-sm text-[var(--muted)]">Nobody active right now.</p>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-[var(--muted)]">
              <tr>
                <th className="py-2 font-medium">Page</th>
                <th className="py-2 font-medium">Place</th>
                <th className="py-2 font-medium">Device</th>
                <th className="py-2 text-right font-medium">Seen</th>
              </tr>
            </thead>
            <tbody>
              {summary.live.rows.map((row, index) => (
                <tr key={`${row.path}-${row.seenAgoSec}-${index}`} className="border-t border-[var(--stroke)]">
                  <td className="max-w-[20rem] truncate py-2 pr-3">{row.path}</td>
                  <td className="py-2 pr-3">{row.city || row.country || "—"}</td>
                  <td className="py-2 pr-3">
                    {row.device || "—"}
                    {row.browser ? ` · ${row.browser}` : ""}
                  </td>
                  <td className="py-2 text-right tabular-nums">{ago(row.seenAgoSec)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

function duration(ms: number) {
  const seconds = Math.round(ms / 1000);
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  return `${minutes}m ${seconds % 60}s`;
}

function ago(seconds: number) {
  if (seconds < 60) return `${seconds}s ago`;
  return `${Math.floor(seconds / 60)}m ago`;
}
