import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

const SECRET = process.env.WARMER_SECRET || "";
const INDEXNOW_KEY = process.env.INDEXNOW_KEY || "";
const HOST = "panchang.vastucart.in";
const MAX_URLS_PER_SUBMISSION = 10_000;

// IndexNow generic endpoint forwards to Bing + Yandex. Submitting to all
// three gives redundancy if one is temporarily down.
const ENDPOINTS = [
  "https://api.indexnow.org/indexnow",
  "https://www.bing.com/indexnow",
  "https://yandex.com/indexnow",
];

interface SubmitBody {
  urls?: string[];
}

/**
 * POST /api/internal/indexnow/submit?secret={WARMER_SECRET}
 * Body: { urls: ["https://...", ...] }
 *
 * Notifies Bing + Yandex that the given URLs have updated content.
 * Google does not consume IndexNow — for Google we rely on sitemap
 * discovery + organic re-crawl. Reference Files/05 §D.2.
 *
 * Typical caller: the daily panchang refresh cron. Batch up to 10k URLs
 * per submission. IndexNow's daily quota per host is effectively
 * unlimited for domains with healthy crawl history.
 */
export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret") || "";
  if (!SECRET || secret !== SECRET) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  if (!INDEXNOW_KEY) {
    return NextResponse.json(
      { error: "INDEXNOW_KEY env var not configured" },
      { status: 500 }
    );
  }

  const body = (await request.json().catch(() => null)) as SubmitBody | null;
  if (!body?.urls?.length) {
    return NextResponse.json(
      { error: "body must include urls: string[]" },
      { status: 400 }
    );
  }

  const urls = body.urls.slice(0, MAX_URLS_PER_SUBMISSION);
  // keyLocation at ROOT — required so IndexNow accepts URL submissions
  // across the entire domain (not just the /indexnow/ subpath). The
  // middleware serves the key file at this root path.
  const keyLocation = `https://${HOST}/${INDEXNOW_KEY}.txt`;

  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation,
    urlList: urls,
  };

  const results = await Promise.allSettled(
    ENDPOINTS.map(async (endpoint) => {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(payload),
      });
      return { endpoint, status: res.status, ok: res.ok };
    })
  );

  return NextResponse.json({
    submitted: urls.length,
    truncated: body.urls.length > MAX_URLS_PER_SUBMISSION,
    results: results.map((r) =>
      r.status === "fulfilled"
        ? r.value
        : { endpoint: "unknown", error: String(r.reason) }
    ),
  });
}
