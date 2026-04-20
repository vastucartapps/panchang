import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * IndexNow key-file endpoint. Bing and Yandex fetch this URL to verify
 * that the domain owner controls the submitted IndexNow key. The key is
 * stored in INDEXNOW_KEY env var (generate via `openssl rand -hex 32`
 * and rotate quarterly).
 *
 * Expected URL: /indexnow/{INDEXNOW_KEY}.txt
 * Response body: the key itself (plain text).
 *
 * Setup:
 *   1. Generate key: openssl rand -hex 32
 *   2. Set INDEXNOW_KEY in Coolify env vars.
 *   3. Redeploy.
 *   4. Verify: curl https://panchang.vastucart.in/indexnow/{KEY}.txt → 200
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ key: string }> }
) {
  const { key: rawKey } = await params;
  const expected = process.env.INDEXNOW_KEY || "";

  if (!expected) {
    return new NextResponse("IndexNow not configured", { status: 404 });
  }

  const key = rawKey.endsWith(".txt") ? rawKey.slice(0, -4) : rawKey;
  if (key !== expected) {
    return new NextResponse("Not found", { status: 404 });
  }

  return new NextResponse(expected, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
