import type { UnifiedPost } from "@/types/blog";
import { PostCard } from "./PostCard";
import styles from "./RelatedPosts.module.css";

export function RelatedPosts({ posts }: { posts: UnifiedPost[] }) {
  if (posts.length === 0) return null;

  return (
    <div className={styles.wrap}>
      <h2 className={styles.heading}>Related articles</h2>
      <div className={styles.grid}>
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
