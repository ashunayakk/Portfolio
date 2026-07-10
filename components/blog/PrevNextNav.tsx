import Link from "next/link";
import type { UnifiedPost } from "@/types/blog";
import { cx } from "@/lib/utils";
import styles from "./PrevNextNav.module.css";

export function PrevNextNav({ prev, next }: { prev: UnifiedPost | null; next: UnifiedPost | null }) {
  if (!prev && !next) return null;

  return (
    <div className={styles.wrap}>
      {prev ? (
        <Link href={`/blog/${prev.slug}`} className={styles.card}>
          <div className={styles.label}>← Previous</div>
          <div className={styles.title}>{prev.title}</div>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link href={`/blog/${next.slug}`} className={cx(styles.card, styles.next)}>
          <div className={styles.label}>Next →</div>
          <div className={styles.title}>{next.title}</div>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
