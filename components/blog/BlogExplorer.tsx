"use client";

import { useMemo, useState } from "react";
import type { UnifiedPost } from "@/types/blog";
import { CATEGORIES, categoryLabel } from "@/lib/blog/categories";
import { trackEvent } from "@/lib/analytics";
import { cx } from "@/lib/utils";
import { PostCard } from "./PostCard";
import styles from "./BlogExplorer.module.css";

const PAGE_SIZE = 6;

function matchesQuery(post: UnifiedPost, query: string): boolean {
  const q = query.toLowerCase();
  return (
    post.title.toLowerCase().includes(q) ||
    post.description.toLowerCase().includes(q) ||
    categoryLabel(post.category).toLowerCase().includes(q) ||
    post.tags.some((t) => t.toLowerCase().includes(q)) ||
    post.content.toLowerCase().includes(q)
  );
}

export function BlogExplorer({ posts, initialCategory }: { posts: UnifiedPost[]; initialCategory?: string }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(initialCategory ?? null);
  const [tag, setTag] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const usedCategories = useMemo(() => {
    const set = new Set(posts.map((p) => p.category));
    return CATEGORIES.filter((c) => set.has(c.slug));
  }, [posts]);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set).slice(0, 14);
  }, [posts]);

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      if (category && p.category !== category) return false;
      if (tag && !p.tags.includes(tag)) return false;
      if (query.trim() && !matchesQuery(p, query.trim())) return false;
      return true;
    });
  }, [posts, category, tag, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSearch = (value: string) => {
    setQuery(value);
    setPage(1);
    if (value.trim()) trackEvent("blog_search", { query: value.trim() });
  };

  return (
    <div>
      <div className={styles.controls}>
        <div className={styles.searchRow}>
          <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="search"
            className={styles.searchInput}
            placeholder="Search articles..."
            aria-label="Search articles"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <div className={styles.pills} role="group" aria-label="Filter by category">
          <button
            type="button"
            className={cx(styles.pill, !category && styles.active)}
            onClick={() => {
              setCategory(null);
              setPage(1);
            }}
          >
            All
          </button>
          {usedCategories.map((c) => (
            <button
              key={c.slug}
              type="button"
              className={cx(styles.pill, category === c.slug && styles.active)}
              onClick={() => {
                const next = category === c.slug ? null : c.slug;
                setCategory(next);
                setPage(1);
                if (next) trackEvent("category_click", { category: next });
              }}
            >
              {c.label}
            </button>
          ))}
        </div>

        {allTags.length > 0 && (
          <div className={styles.pills} role="group" aria-label="Filter by tag">
            {allTags.map((t) => (
              <button
                key={t}
                type="button"
                className={cx(styles.pill, tag === t && styles.active)}
                onClick={() => {
                  const next = tag === t ? null : t;
                  setTag(next);
                  setPage(1);
                  if (next) trackEvent("tag_click", { tag: next });
                }}
              >
                #{t}
              </button>
            ))}
          </div>
        )}
      </div>

      {pageItems.length === 0 ? (
        <div className={styles.empty}>
          <p>No articles match your search.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {pageItems.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            type="button"
            className={styles.pageBtn}
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            aria-label="Previous page"
          >
            ←
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              type="button"
              className={cx(styles.pageBtn, page === i + 1 && styles.active)}
              onClick={() => setPage(i + 1)}
              aria-label={`Page ${i + 1}`}
              aria-current={page === i + 1}
            >
              {i + 1}
            </button>
          ))}
          <button
            type="button"
            className={styles.pageBtn}
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            aria-label="Next page"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}
