import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * Legacy IndexNow key-file endpoint at /indexnow/{KEY}.txt. Kept as a
 * backup path, but the canonical location is now ROOT /{KEY}.txt
 * (served by middleware) because IndexNow requires submitted URLs to
 * share the path prefix of keyLocation. A subpath key would constrain
 * submissions to that subpath only.
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
