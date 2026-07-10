import { put } from "@vercel/blob";
import { prisma } from "@/lib/db";
import { CATEGORIES } from "./categories";
import { isSlugTaken } from "./slug";
import { slugify } from "@/lib/utils";
import { wordCount } from "./reading-time";

const GEMINI_TEXT_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent";
const GEMINI_IMAGE_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent";

interface GeneratedPost {
  title: string;
  description: string;
  category: string;
  tags: string[];
  content: string;
  imagePrompt: string;
}

interface GeminiPart {
  text?: string;
  inlineData?: { data: string; mimeType: string };
}

function requireApiKey(): string {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY is not set");
  return apiKey;
}

async function generatePostContent(recentTitles: string[]): Promise<GeneratedPost> {
  const apiKey = requireApiKey();
  const categoryList = CATEGORIES.map((c) => c.slug).join(", ");

  const prompt = `You are writing a new blog post for Ashutosh Nayak's professional portfolio blog. He is an AI & ML Engineer, Business Analyst, and Frappe/ERPNext Developer.

Write one original, genuinely useful blog post (800-1200 words) about a topic from his areas of expertise: AI, machine learning, LLMs, agentic AI, business analysis, ERPNext/Frappe development, Python, SQL, data analytics, or software engineering practices.

Do NOT write about any of these already-published topics: ${recentTitles.length ? recentTitles.join("; ") : "(none published yet)"}.

Pick exactly one category slug from this fixed list: ${categoryList}.

Return ONLY valid JSON matching this exact shape, no markdown fences, no commentary:
{
  "title": "specific and compelling, under 70 characters",
  "description": "1-2 sentences, under 160 characters, for SEO meta description",
  "category": "one of the exact category slugs listed above",
  "tags": ["3 to 5 short tags"],
  "content": "the full article body in Markdown, with ## subheadings, at least 800 words",
  "imagePrompt": "a short visual description, under 30 words, for an editorial cover illustration representing this post's topic, in flat minimalist vector style"
}`;

  const res = await fetch(GEMINI_TEXT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: "application/json", maxOutputTokens: 4000 },
    }),
  });

  if (!res.ok) {
    throw new Error(`Gemini text generation failed: ${res.status} ${await res.text()}`);
  }

  const data = await res.json();
  const parts: GeminiPart[] = data?.candidates?.[0]?.content?.parts ?? [];
  const text = parts.map((p) => p.text ?? "").join("");
  return JSON.parse(text) as GeneratedPost;
}

async function generateCoverImage(imagePrompt: string): Promise<Buffer | null> {
  const apiKey = requireApiKey();
  const stylePrompt = `${imagePrompt}. Style: flat minimalist vector illustration, warm beige and terracotta-orange color palette, thin outline strokes, plenty of negative space, no text or letters anywhere in the image, editorial blog cover art.`;

  const res = await fetch(GEMINI_IMAGE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
    body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: stylePrompt }] }] }),
  });

  if (!res.ok) {
    console.error("Gemini image generation failed:", res.status, await res.text());
    return null;
  }

  const data = await res.json();
  const parts: GeminiPart[] = data?.candidates?.[0]?.content?.parts ?? [];
  const imagePart = parts.find((p) => p.inlineData);
  if (!imagePart?.inlineData) return null;

  return Buffer.from(imagePart.inlineData.data, "base64");
}

export async function generateDailyPost(): Promise<{ slug: string; title: string }> {
  const recent = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    take: 15,
    select: { title: true },
  });

  const generated = await generatePostContent(recent.map((p) => p.title));

  let slug = slugify(generated.title);
  let suffix = 2;
  while (await isSlugTaken(slug)) {
    slug = slugify(`${generated.title}-${suffix}`);
    suffix += 1;
  }

  let coverImage: string | null = null;
  try {
    const imageBuffer = await generateCoverImage(generated.imagePrompt);
    if (imageBuffer) {
      const blob = await put(`blog/${slug}.png`, imageBuffer, {
        access: "public",
        contentType: "image/png",
        addRandomSuffix: true,
      });
      coverImage = blob.url;
    }
  } catch (err) {
    console.error("cover image generation failed, continuing without one:", err);
  }

  const category = CATEGORIES.some((c) => c.slug === generated.category)
    ? generated.category
    : (CATEGORIES[0]?.slug ?? "artificial-intelligence");

  const post = await prisma.post.create({
    data: {
      title: generated.title,
      slug,
      description: generated.description,
      content: generated.content,
      category,
      tags: generated.tags.slice(0, 5),
      coverImage,
      status: "PUBLISHED",
      featured: false,
      wordCount: wordCount(generated.content),
      publishedAt: new Date(),
    },
  });

  return { slug: post.slug, title: post.title };
}
