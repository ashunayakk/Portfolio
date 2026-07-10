import type { Post } from "@prisma/client";
import { prisma } from "@/lib/db";
import type { UnifiedPost } from "@/types/blog";
import { readingTime, wordCount } from "./reading-time";

export function toUnifiedPost(post: Post): UnifiedPost {
  return {
    source: "db",
    slug: post.slug,
    title: post.title,
    description: post.description,
    coverImage: post.coverImage ?? "",
    category: post.category,
    tags: post.tags,
    author: "Ashutosh Nayak",
    publishedAt: (post.publishedAt ?? post.createdAt).toISOString(),
    updatedAt: post.updatedAt.toISOString(),
    featured: post.featured,
    content: post.content,
    readingTime: readingTime(post.content),
    wordCount: wordCount(post.content),
    viewCount: post.viewCount,
  };
}

export async function getPublishedDbPosts(): Promise<UnifiedPost[]> {
  const posts = await prisma.post.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
  });
  return posts.map(toUnifiedPost);
}

export async function getPublishedDbPostBySlug(slug: string): Promise<UnifiedPost | null> {
  const post = await prisma.post.findUnique({ where: { slug } });
  if (!post || post.status !== "PUBLISHED") return null;
  return toUnifiedPost(post);
}

export async function incrementViewCount(slug: string): Promise<void> {
  await prisma.post.updateMany({ where: { slug, status: "PUBLISHED" }, data: { viewCount: { increment: 1 } } });
}
