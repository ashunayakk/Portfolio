import { createHash } from "crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { trackViewSchema } from "@/lib/validations/analytics";

/** Deterministic per-IP visitor identity — the same IP always hashes to the
 * same visitorId, so unique-visitor counts don't inflate when someone
 * clears cookies, switches browsers, or opens an incognito window. Hashed
 * (rather than stored raw) so we never persist actual IP addresses. */
function visitorIdFromRequest(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  const salt = process.env.AUTH_SECRET ?? "portfolio-analytics";
  return createHash("sha256").update(`${ip}:${salt}`).digest("hex");
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = trackViewSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { path, referrer } = parsed.data;

  if (path.startsWith("/admin")) {
    return NextResponse.json({ ok: true });
  }

  const visitorId = visitorIdFromRequest(request);

  try {
    await prisma.pageView.create({
      data: { path, referrer: referrer || null, visitorId },
    });
  } catch (err) {
    console.error("analytics track error:", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
