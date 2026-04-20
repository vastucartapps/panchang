import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

const SECRET = process.env.WARMER_SECRET || "";
const MAX_PATHS_PER_CALL = 500;

interface RevalidateBody {
  paths?: string[];
}

/**
 * POST /api/internal/revalidate?secret={WARMER_SECRET}
 * Body: { paths: ["/", "/new-delhi", "/hindu-festivals/diwali-2026", ...] }
 *
 * Forces ISR cache invalidation for the given paths. Use after:
 *   - deploying schema code changes (ISR cache is volume-persistent and
 *     survives container restarts, so new code alone doesn't refresh
 *     cached HTML — pages serve stale until `revalidate` expires)
 *   - fixing data bugs (e.g., festival date corrections)
 *   - manual SEO actions after bundle ships
 *
 * Typical workflow post-deploy:
 *   curl -X POST "https://.../api/internal/revalidate?secret=$WARMER_SECRET" \
 *     -H 'content-type: application/json' \
 *     -d '{"paths":["/","/new-delhi","/hindu-festivals/diwali-2026"]}'
 */
export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret") || "";
  if (!SECRET || secret !== SECRET) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const body = (await request.json().catch(() => null)) as RevalidateBody | null;
  if (!body?.paths?.length) {
    return NextResponse.json(
      { error: "body must include paths: string[]" },
      { status: 400 }
    );
  }

  const paths = body.paths.slice(0, MAX_PATHS_PER_CALL);
  const errors: Array<{ path: string; error: string }> = [];

  for (const p of paths) {
    try {
      revalidatePath(p);
    } catch (err) {
      errors.push({
        path: p,
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }

  return NextResponse.json({
    revalidated: paths.length - errors.length,
    truncated: body.paths.length > MAX_PATHS_PER_CALL,
    errors,
  });
}
