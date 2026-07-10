import Link from "next/link";
import type { UnifiedPost } from "@/types/blog";
import { categoryLabel } from "@/lib/blog/categories";
import { formatDate } from "@/lib/utils";
import { PostCoverImage } from "./PostCoverImage";
import styles from "./FeaturedPost.module.css";

export function FeaturedPost({ post }: { post: UnifiedPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className={styles.card}>
      <div className={styles.imageWrap}>
        <PostCoverImage src={post.coverImage} alt={post.title} sizes="(max-width: 780px) 100vw, 50vw" />
      </div>
      <div className={styles.body}>
        <span className={styles.badge}>Featured · {categoryLabel(post.category)}</span>
        <h2 className={styles.title}>{post.title}</h2>
        <p className={styles.desc}>{post.description}</p>
        <span className={styles.meta}>
          {formatDate(post.publishedAt)} · {post.readingTime} min read
        </span>
      </div>
    </Link>
  );
}
