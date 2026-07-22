import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog/posts";
import { CATEGORIES } from "@/lib/blog/categories";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/blog`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/work`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/experience`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/skills`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/education`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/certificates`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/contact`, changeFrequency: "monthly", priority: 0.6 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.map((c) => ({
    url: `${SITE_URL}/blog/category/${c.slug}`,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.updatedAt ?? post.publishedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...categoryRoutes, ...postRoutes];
}
