import type { Metadata } from "next";
import nextDynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { BlogExplorer } from "@/components/blog/BlogExplorer";
import { getAllPosts } from "@/lib/blog/posts";
import { categoryLabel, isValidCategory } from "@/lib/blog/categories";
import styles from "../../blog-page.module.css";

const WhatsAppWidget = nextDynamic(() => import("@/components/layout/WhatsAppWidget").then((m) => m.WhatsAppWidget));
const ChatWidget = nextDynamic(() => import("@/components/layout/ChatWidget").then((m) => m.ChatWidget));

// Must reflect admin CMS publish/unpublish/edit actions immediately —
// see the matching note in app/blog/[slug]/page.tsx. generateStaticParams
// is deliberately omitted here too, for the same reason (mixing it with
// force-dynamic still served stale prerendered content in testing).
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  if (!isValidCategory(category)) return {};
  const label = categoryLabel(category);
  return {
    title: `${label} articles`,
    description: `Articles about ${label} by Ashutosh Nayak.`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  if (!isValidCategory(category)) notFound();

  const posts = await getAllPosts();
  const label = categoryLabel(category);

  return (
    <>
      <Navbar />
      <main>
        <section className={`${styles.hero} container`}>
          <p className="eyebrow">Category</p>
          <h1 className={styles.heading}>{label}</h1>
        </section>
        <section className="container" style={{ paddingBottom: 100 }}>
          <BlogExplorer posts={posts} initialCategory={category} />
        </section>
      </main>
      <WhatsAppWidget />
      <ChatWidget />
    </>
  );
}
