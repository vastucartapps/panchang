import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getWarmerState } from "@/lib/warmer-state";

export const dynamic = "force-dynamic";

const WARMER_SECRET = process.env.WARMER_SECRET || "";

export function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret") || "";
  if (!WARMER_SECRET || secret !== WARMER_SECRET) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const s = getWarmerState();
  const elapsedMs =
    s.startedAt && !s.finishedAt
      ? Date.now() - new Date(s.startedAt).getTime()
      : s.startedAt && s.finishedAt
        ? new Date(s.finishedAt).getTime() - new Date(s.startedAt).getTime()
        : 0;

  return NextResponse.json({
    running: s.running,
    mode: s.mode,
    completed: s.completed,
    total: s.total,
    startedAt: s.startedAt,
    finishedAt: s.finishedAt,
    elapsedMs,
    lastCompletedUrl: s.lastCompletedUrl,
    lastError: s.lastError,
  });
}
