import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { compilePreviewHtml } from "@/lib/blog/preview";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const markdown = body?.markdown;
  if (typeof markdown !== "string") {
    return NextResponse.json({ error: "markdown is required" }, { status: 400 });
  }

  const html = await compilePreviewHtml(markdown);
  return NextResponse.json({ html });
}
