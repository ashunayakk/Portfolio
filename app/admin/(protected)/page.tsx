import Link from "next/link";
import { prisma } from "@/lib/db";
import { StatCard } from "@/components/admin/StatCard";
import { formatDate } from "@/lib/utils";
import styles from "./admin-page.module.css";

export default async function AdminDashboardPage() {
  const [total, published, drafts, viewsAgg, mostViewed, latest, recent, unreadMessages] = await Promise.all([
    prisma.post.count(),
    prisma.post.count({ where: { status: "PUBLISHED" } }),
    prisma.post.count({ where: { status: "DRAFT" } }),
    prisma.post.aggregate({ _sum: { viewCount: true } }),
    prisma.post.findFirst({ orderBy: { viewCount: "desc" } }),
    prisma.post.findFirst({ orderBy: { createdAt: "desc" } }),
    prisma.post.findMany({ orderBy: { updatedAt: "desc" }, take: 5 }),
    prisma.message.count({ where: { read: false } }),
  ]);

  return (
    <div>
      <h1 className={styles.heading}>Dashboard</h1>

      <div className={styles.statsGrid}>
        <StatCard label="Total blogs" value={total} />
        <StatCard label="Published" value={published} />
        <StatCard label="Drafts" value={drafts} />
        <StatCard label="Total views" value={viewsAgg._sum.viewCount ?? 0} />
      </div>

      <div className={styles.statsGrid}>
        <StatCard label="Unread messages" value={unreadMessages} />
        <StatCard label="Most viewed" value={mostViewed?.title ?? "—"} />
        <StatCard label="Latest blog" value={latest?.title ?? "—"} />
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Recent activity</h2>
        <div className={styles.list}>
          {recent.length === 0 ? (
            <div className={styles.empty}>No blog posts yet — create your first one.</div>
          ) : (
            recent.map((post) => (
              <Link key={post.id} href={`/admin/blogs/${post.id}/edit`} className={styles.row}>
                <span>{post.title}</span>
                <span className={styles.rowMeta}>
                  {post.status} · updated {formatDate(post.updatedAt)}
                </span>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
