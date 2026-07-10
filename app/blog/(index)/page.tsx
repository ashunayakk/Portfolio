import type { Metadata } from "next";
import nextDynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { FeaturedPost } from "@/components/blog/FeaturedPost";
import { BlogExplorer } from "@/components/blog/BlogExplorer";
import { getAllPosts, getFeaturedPost } from "@/lib/blog/posts";
import styles from "../blog-page.module.css";

const WhatsAppWidget = nextDynamic(() => import("@/components/layout/WhatsAppWidget").then((m) => m.WhatsAppWidget));
const ChatWidget = nextDynamic(() => import("@/components/layout/ChatWidget").then((m) => m.ChatWidget));

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writing on AI, machine learning, ERPNext, Frappe development, data analytics and enterprise software by Ashutosh Nayak.",
};

// Must reflect admin CMS publish/unpublish/edit actions immediately —
// see the matching note in app/blog/[slug]/page.tsx.
export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const [posts, featured] = await Promise.all([getAllPosts(), getFeaturedPost()]);

  return (
    <>
      <Navbar />
      <main>
        <section className={`${styles.hero} container`}>
          <p className="eyebrow">Blog</p>
          <h1 className={styles.heading}>Writing on AI, ERP and building intelligent systems.</h1>
          <p className={styles.sub}>
            Notes on artificial intelligence, machine learning, ERPNext &amp; Frappe development, data analytics and
            the craft of enterprise software.
          </p>
        </section>

        <section className="container" style={{ paddingBottom: 100 }}>
          {posts.length === 0 ? (
            <div className={styles.empty}>
              <p>No articles published yet — check back soon.</p>
            </div>
          ) : (
            <>
              {featured && <FeaturedPost post={featured} />}
              <BlogExplorer posts={posts} />
            </>
          )}
        </section>
      </main>
      <WhatsAppWidget />
      <ChatWidget />
    </>
  );
}
