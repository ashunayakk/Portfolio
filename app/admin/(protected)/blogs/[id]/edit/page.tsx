import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { PostForm } from "@/components/admin/PostForm";
import { updatePost, deletePost, duplicatePost, setPostStatus } from "@/lib/actions/posts";
import styles from "../../../admin-page.module.css";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) notFound();

  const boundUpdate = updatePost.bind(null, id);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, flexWrap: "wrap", gap: 12 }}>
        <h1 className={styles.heading} style={{ marginBottom: 0 }}>
          Edit post
        </h1>
        <div style={{ display: "flex", gap: 8 }}>
          {post.status === "PUBLISHED" ? (
            <Link href={`/blog/${post.slug}`} target="_blank" className="btn btn-outline">
              View live ↗
            </Link>
          ) : (
            <form action={setPostStatus.bind(null, id, "PUBLISHED")}>
              <button type="submit" className="btn btn-outline">
                Publish
              </button>
            </form>
          )}
          {post.status === "PUBLISHED" && (
            <form action={setPostStatus.bind(null, id, "DRAFT")}>
              <button type="submit" className="btn btn-outline">
                Unpublish
              </button>
            </form>
          )}
          <form action={duplicatePost.bind(null, id)}>
            <button type="submit" className="btn btn-outline">
              Duplicate
            </button>
          </form>
          <form action={deletePost.bind(null, id)}>
            <button type="submit" className="btn btn-outline">
              Delete
            </button>
          </form>
        </div>
      </div>

      <PostForm
        key={post.updatedAt.toISOString()}
        action={boundUpdate}
        submitLabel="Save changes"
        initial={{
          title: post.title,
          slug: post.slug,
          description: post.description,
          content: post.content,
          category: post.category,
          tags: post.tags,
          coverImage: post.coverImage ?? "",
          status: post.status,
          featured: post.featured,
        }}
      />
    </div>
  );
}
