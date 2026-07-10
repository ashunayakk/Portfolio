import styles from "../admin-page.module.css";

export default function SettingsPage() {
  return (
    <div>
      <h1 className={styles.heading}>Settings</h1>
      <div className={styles.list}>
        <div className={styles.row}>
          <span>Admin account</span>
          <span className={styles.rowMeta}>Managed via ADMIN_EMAIL / ADMIN_PASSWORD_HASH env vars</span>
        </div>
        <div className={styles.row}>
          <span>Site URL</span>
          <span className={styles.rowMeta}>Managed via NEXT_PUBLIC_SITE_URL env var</span>
        </div>
        <div className={styles.row}>
          <span>Analytics</span>
          <span className={styles.rowMeta}>Managed via NEXT_PUBLIC_GA_ID / NEXT_PUBLIC_CLARITY_ID env vars</span>
        </div>
      </div>
    </div>
  );
}
