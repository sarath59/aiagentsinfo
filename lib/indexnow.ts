const HOST = "www.aiagentsinfo.com";

/** Public on purpose. Must match public/<key>.txt, which scripts/indexnow.mjs also reads. */
const KEY = "82ebda3bef03bdadc082ad9758314398c3c7d34aca6e6755c2220e5708e2be81";

/** Server-only. Submits site paths to IndexNow from the production deployment. Never throws. */
export async function pingIndexNow(paths: string[]) {
  if (process.env.VERCEL_ENV !== "production" || paths.length === 0) return;
  const urlList = [...new Set(paths)].map((path) => `https://${HOST}${path}`);
  try {
    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8", "User-Agent": "aiagentsinfo-indexnow" },
      body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
      cache: "no-store",
      signal: AbortSignal.timeout(8_000),
    });
    if (response.status !== 200 && response.status !== 202) {
      console.warn("[indexnow] HTTP", response.status);
    }
    await response.body?.cancel().catch(() => undefined);
  } catch (error) {
    console.warn("[indexnow] network", error instanceof Error ? error.message : "error");
  }
}
