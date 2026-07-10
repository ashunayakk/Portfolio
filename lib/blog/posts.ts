import type { UnifiedPost } from "@/types/blog";
import { getAllMdxPosts, getMdxPost } from "./mdx";
import { getPublishedDbPosts, getPublishedDbPostBySlug, incrementViewCount } from "./db-posts";

/** Single entry point for post data across the blog. Merges file-based MDX
 * posts (content/blog/*.mdx) with published DB posts (authored via the
 * admin CMS) so /blog, sitemap.ts, and feed.xml all keep calling this same
 * function without caring where a given post's content lives. MDX slugs
 * take priority on collision — the admin create/edit action is responsible
 * for rejecting a slug that already exists as an MDX file. */
export async function getAllPosts(): Promise<UnifiedPost[]> {
  const mdxPosts = getAllMdxPosts();
  const dbPosts = await getPublishedDbPosts();
  const mdxSlugs = new Set(mdxPosts.map((p) => p.slug));
  const merged = [...mdxPosts, ...dbPosts.filter((p) => !mdxSlugs.has(p.slug))];
  return merged.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

/** Pure read, no side effects — safe to call from both generateMetadata and
 * the page body without double-counting anything. View tracking is a
 * separate explicit call (see recordPostView) made once from the page body. */
export async function getPostBySlug(slug: string): Promise<UnifiedPost | null> {
  const mdxPost = getMdxPost(slug);
  if (mdxPost) return mdxPost;
  return getPublishedDbPostBySlug(slug);
}

/** Call exactly once per real page view, from the page component body only
 * (never from generateMetadata, which Next.js may invoke separately from —
 * and in addition to — rendering the page). No-ops for MDX-sourced posts,
 * which have no DB row to increment. */
export async function recordPostView(post: UnifiedPost): Promise<void> {
  if (post.source === "db") {
    await incrementViewCount(post.slug);
  }
}

export async function getFeaturedPost(): Promise<UnifiedPost | null> {
  const posts = await getAllPosts();
  return posts.find((p) => p.featured) ?? posts[0] ?? null;
}

export async function getPostsByCategory(category: string): Promise<UnifiedPost[]> {
  const posts = await getAllPosts();
  return posts.filter((p) => p.category === category);
}

export async function getRelatedPosts(post: UnifiedPost, limit = 3): Promise<UnifiedPost[]> {
  const posts = await getAllPosts();
  const scored = posts
    .filter((p) => p.slug !== post.slug)
    .map((p) => {
      let score = 0;
      if (p.category === post.category) score += 2;
      score += p.tags.filter((t) => post.tags.includes(t)).length;
      return { post: p, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((s) => s.post);
}

export async function getAdjacentPosts(slug: string): Promise<{ prev: UnifiedPost | null; next: UnifiedPost | null }> {
  const posts = await getAllPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: posts[index + 1] ?? null,
    next: posts[index - 1] ?? null,
  };
}

export interface SearchDoc {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  content: string;
}

export async function getSearchIndex(): Promise<SearchDoc[]> {
  const posts = await getAllPosts();
  return posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    category: p.category,
    tags: p.tags,
    content: p.content,
  }));
}
