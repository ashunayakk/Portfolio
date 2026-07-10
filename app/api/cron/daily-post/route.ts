import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { generateDailyPost } from "@/lib/blog/daily-generator";

export const maxDuration = 60;

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await generateDailyPost();
    revalidatePath("/blog");
    revalidatePath("/admin/blogs");
    revalidatePath("/admin");
    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error("daily post generation failed:", err);
    return NextResponse.json({ error: "Generation failed", detail: String(err) }, { status: 500 });
  }
}
