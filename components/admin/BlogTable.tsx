"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { formatDate, cx } from "@/lib/utils";
import { categoryLabel } from "@/lib/blog/categories";
import { deletePost, setPostStatus, toggleFeatured, duplicatePost } from "@/lib/actions/posts";
import styles from "./BlogTable.module.css";

export interface AdminPostRow {
  id: string;
  title: string;
  slug: string;
  category: string;
  status: "DRAFT" | "PUBLISHED";
  featured: boolean;
  viewCount: number;
  updatedAt: string;
}

type Tab = "all" | "published" | "draft";

export function BlogTable({ posts }: { posts: AdminPostRow[] }) {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<Tab>("all");

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      if (tab === "published" && p.status !== "PUBLISHED") return false;
      if (tab === "draft" && p.status !== "DRAFT") return false;
      if (query.trim() && !p.title.toLowerCase().includes(query.trim().toLowerCase())) return false;
      return true;
    });
  }, [posts, tab, query]);

  return (
    <div>
      <div className={styles.toolbar}>
        <input
          type="search"
          placeholder="Search blogs..."
          className={styles.searchInput}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className={styles.tabs}>
          {(["all", "published", "draft"] as const).map((t) => (
            <button
              key={t}
              type="button"
              className={cx(styles.tab, tab === t && styles.active)}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </div>
        <Link href="/admin/blogs/new" className="btn btn-primary">
          + New post
        </Link>
      </div>

      {filtered.length === 0 ? (
        <div className={styles.empty}>No blog posts match.</div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Views</th>
              <th>Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((post) => (
              <tr key={post.id}>
                <td className={styles.titleCell}>
                  <Link href={`/admin/blogs/${post.id}/edit`}>{post.title}</Link>
                  {post.featured && " ★"}
                </td>
                <td>{categoryLabel(post.category)}</td>
                <td>
                  <span
                    className={cx(
                      styles.badge,
                      post.status === "PUBLISHED" ? styles.badgePublished : styles.badgeDraft
                    )}
                  >
                    {post.status}
                  </span>
                </td>
                <td>{post.viewCount}</td>
                <td>{formatDate(post.updatedAt)}</td>
                <td>
                  <div className={styles.actions}>
                    <Link href={`/admin/blogs/${post.id}/edit`} className={styles.actionBtn}>
                      Edit
                    </Link>
                    <form action={setPostStatus.bind(null, post.id, post.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED")}>
                      <button type="submit" className={styles.actionBtn}>
                        {post.status === "PUBLISHED" ? "Unpublish" : "Publish"}
                      </button>
                    </form>
                    <form action={toggleFeatured.bind(null, post.id, !post.featured)}>
                      <button type="submit" className={styles.actionBtn}>
                        {post.featured ? "Unfeature" : "Feature"}
                      </button>
                    </form>
                    <form action={duplicatePost.bind(null, post.id)}>
                      <button type="submit" className={styles.actionBtn}>
                        Duplicate
                      </button>
                    </form>
                    <form action={deletePost.bind(null, post.id)}>
                      <button type="submit" className={styles.actionBtn}>
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
