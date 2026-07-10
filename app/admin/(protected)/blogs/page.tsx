import { prisma } from "@/lib/db";
import { BlogTable, type AdminPostRow } from "@/components/admin/BlogTable";
import styles from "../admin-page.module.css";

export default async function AdminBlogsPage() {
  const posts = await prisma.post.findMany({ orderBy: { updatedAt: "desc" } });

  const rows: AdminPostRow[] = posts.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    category: p.category,
    status: p.status,
    featured: p.featured,
    viewCount: p.viewCount,
    updatedAt: p.updatedAt.toISOString(),
  }));

  return (
    <div>
      <h1 className={styles.heading}>Blogs</h1>
      <BlogTable posts={rows} />
    </div>
  );
}
