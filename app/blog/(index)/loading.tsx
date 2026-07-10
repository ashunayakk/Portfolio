import styles from "./loading.module.css";

export default function BlogLoading() {
  return (
    <div className={`${styles.wrap} container`}>
      <div className={styles.skeletonLine} style={{ width: 120, marginBottom: 16 }} />
      <div className={styles.skeletonLine} style={{ width: "60%", height: 44, marginBottom: 40 }} />
      <div className={styles.grid}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={styles.card} />
        ))}
      </div>
    </div>
  );
}
