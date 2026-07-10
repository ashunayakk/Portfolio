import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { PostFrontmatter, UnifiedPost } from "@/types/blog";
import { readingTime, wordCount } from "./reading-time";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export function listMdxSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getMdxPost(slug: string): UnifiedPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const fm = data as PostFrontmatter;

  return {
    source: "mdx",
    slug,
    title: fm.title,
    description: fm.description,
    coverImage: fm.coverImage,
    category: fm.category,
    tags: fm.tags ?? [],
    author: fm.author,
    publishedAt: fm.publishedAt,
    updatedAt: fm.updatedAt,
    featured: fm.featured ?? false,
    content,
    readingTime: readingTime(content),
    wordCount: wordCount(content),
    viewCount: 0,
  };
}

export function getAllMdxPosts(): UnifiedPost[] {
  return listMdxSlugs()
    .map((slug) => getMdxPost(slug))
    .filter((p): p is UnifiedPost => p !== null);
}
