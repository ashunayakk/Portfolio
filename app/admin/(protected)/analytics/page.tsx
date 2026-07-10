import { prisma } from "@/lib/db";
import { StatCard } from "@/components/admin/StatCard";
import styles from "../admin-page.module.css";

const DAY_MS = 24 * 60 * 60 * 1000;

interface DailyRow {
  day: Date;
  count: bigint;
}

export default async function AnalyticsPage() {
  const now = new Date();
  const since7d = new Date(now.getTime() - 7 * DAY_MS);
  const since30d = new Date(now.getTime() - 30 * DAY_MS);
  const since14d = new Date(now.getTime() - 14 * DAY_MS);

  const [
    totalViews,
    views7d,
    views30d,
    visitorsAll,
    visitors7d,
    topPages,
    topReferrers,
    dailyRows,
  ] = await Promise.all([
    prisma.pageView.count(),
    prisma.pageView.count({ where: { createdAt: { gte: since7d } } }),
    prisma.pageView.count({ where: { createdAt: { gte: since30d } } }),
    prisma.pageView.findMany({ distinct: ["visitorId"], select: { visitorId: true } }),
    prisma.pageView.findMany({
      where: { createdAt: { gte: since7d } },
      distinct: ["visitorId"],
      select: { visitorId: true },
    }),
    prisma.pageView.groupBy({
      by: ["path"],
      _count: { path: true },
      orderBy: { _count: { path: "desc" } },
      take: 10,
    }),
    prisma.pageView.groupBy({
      by: ["referrer"],
      where: { referrer: { not: null } },
      _count: { referrer: true },
      orderBy: { _count: { referrer: "desc" } },
      take: 8,
    }),
    prisma.$queryRaw<DailyRow[]>`
      SELECT date_trunc('day', "createdAt") AS day, count(*) AS count
      FROM "PageView"
      WHERE "createdAt" >= ${since14d}
      GROUP BY day
      ORDER BY day ASC
    `,
  ]);

  const dailyMap = new Map(dailyRows.map((r) => [r.day.toISOString().slice(0, 10), Number(r.count)]));
  const days: { date: string; count: number }[] = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date(now.getTime() - i * DAY_MS).toISOString().slice(0, 10);
    days.push({ date: d, count: dailyMap.get(d) ?? 0 });
  }
  const maxDaily = Math.max(1, ...days.map((d) => d.count));

  return (
    <div>
      <h1 className={styles.heading}>Analytics</h1>

      <div className={styles.statsGrid}>
        <StatCard label="Total page views" value={totalViews} />
        <StatCard label="Views (7d)" value={views7d} />
        <StatCard label="Views (30d)" value={views30d} />
        <StatCard label="Unique visitors (all-time)" value={visitorsAll.length} />
      </div>

      <div className={styles.statsGrid}>
        <StatCard label="Unique visitors (7d)" value={visitors7d.length} />
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Views, last 14 days</h2>
        <div className={styles.sparkline}>
          {days.map((d) => (
            <div key={d.date} className={styles.sparkbarWrap} title={`${d.date}: ${d.count}`}>
              <div className={styles.sparkbar} style={{ height: `${(d.count / maxDaily) * 100}%` }} />
              <span className={styles.sparkLabel}>{d.date.slice(5)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Top pages</h2>
        <div className={styles.list}>
          {topPages.length === 0 ? (
            <div className={styles.empty}>No page views recorded yet.</div>
          ) : (
            topPages.map((p) => (
              <div key={p.path} className={styles.row}>
                <span>{p.path}</span>
                <span className={styles.rowMeta}>{p._count.path} views</span>
              </div>
            ))
          )}
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Top referrers</h2>
        <div className={styles.list}>
          {topReferrers.length === 0 ? (
            <div className={styles.empty}>No referrer data yet — most visits are direct.</div>
          ) : (
            topReferrers.map((r) => (
              <div key={r.referrer} className={styles.row}>
                <span>{r.referrer}</span>
                <span className={styles.rowMeta}>{r._count.referrer} views</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
