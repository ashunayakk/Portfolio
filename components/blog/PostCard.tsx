import Link from "next/link";
import type { UnifiedPost } from "@/types/blog";
import { categoryLabel } from "@/lib/blog/categories";
import { formatDate } from "@/lib/utils";
import { PostCoverImage } from "./PostCoverImage";
import styles from "./PostCard.module.css";

export function PostCard({ post }: { post: UnifiedPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className={styles.card}>
      <div className={styles.imageWrap}>
        <PostCoverImage src={post.coverImage} alt={post.title} sizes="(max-width: 680px) 100vw, 33vw" />
      </div>
      <div className={styles.body}>
        <span className={styles.category}>{categoryLabel(post.category)}</span>
        <h3 className={styles.title}>{post.title}</h3>
        <p className={styles.desc}>{post.description}</p>
        <div className={styles.meta}>
          <span>{formatDate(post.publishedAt)}</span>
          <span>·</span>
          <span>{post.readingTime} min read</span>
        </div>
        <div className={styles.tags}>
          {post.tags.slice(0, 3).map((tag) => (
            <span key={tag} className={styles.tag}>
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
