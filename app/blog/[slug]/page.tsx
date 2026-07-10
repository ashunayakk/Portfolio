import type { Metadata } from "next";
import Link from "next/link";
import nextDynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { MdxRenderer } from "@/components/blog/MdxRenderer";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { ReadingProgressBar } from "@/components/blog/ReadingProgressBar";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { PrevNextNav } from "@/components/blog/PrevNextNav";
import { NewsletterPlaceholder } from "@/components/blog/NewsletterPlaceholder";
import { PostCoverImage } from "@/components/blog/PostCoverImage";
import { BlogViewTracker } from "@/components/blog/BlogViewTracker";
import { getPostBySlug, getRelatedPosts, getAdjacentPosts, recordPostView } from "@/lib/blog/posts";
import { extractHeadings } from "@/lib/blog/headings";
import { categoryLabel } from "@/lib/blog/categories";
import { formatDate } from "@/lib/utils";
import { SITE_URL } from "@/lib/seo";
import styles from "./article.module.css";

const WhatsAppWidget = nextDynamic(() => import("@/components/layout/WhatsAppWidget").then((m) => m.WhatsAppWidget));
const ChatWidget = nextDynamic(() => import("@/components/layout/ChatWidget").then((m) => m.ChatWidget));

// DB-backed posts can be published/unpublished/edited at any time via the
// admin CMS and must reflect that immediately. Mixing generateStaticParams
// with dynamic = "force-dynamic" turned out to still serve params from the
// prerender manifest with stale content/status (confirmed via the
// x-nextjs-prerender response header even after revalidatePath calls) —
// a known rough edge in how the two interact. Dropping
// generateStaticParams entirely and rendering every request on demand
// removes that ambiguity; the added cost is trivial (an fs read for MDX,
// one indexed query for DB posts).
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const url = `${SITE_URL}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    authors: [{ name: post.author }],
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url,
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  await recordPostView(post);

  const [related, { prev, next }] = await Promise.all([getRelatedPosts(post), getAdjacentPosts(slug)]);
  const headings = extractHeadings(post.content);
  const url = `${SITE_URL}/blog/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: post.coverImage ? [`${SITE_URL}${post.coverImage}`] : undefined,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: { "@type": "Person", name: post.author },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 2, name: post.title, item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <BlogViewTracker slug={post.slug} category={post.category} />
      <ReadingProgressBar />
      <Navbar />
      <main>
        <div className={`${styles.hero} container`}>
          <Link href="/blog" className={styles.back}>
            ← Back to blog
          </Link>
          <span className={styles.category}>{categoryLabel(post.category)}</span>
          <h1 className={styles.title}>{post.title}</h1>
          <div className={styles.metaRow}>
            <span>{post.author}</span>
            <span>·</span>
            <span>{formatDate(post.publishedAt)}</span>
            {post.updatedAt && (
              <>
                <span>·</span>
                <span>Updated {formatDate(post.updatedAt)}</span>
              </>
            )}
            <span>·</span>
            <span>{post.readingTime} min read</span>
            <ShareButtons title={post.title} url={url} />
          </div>

          <div className={styles.coverWrap}>
            <PostCoverImage
              src={post.coverImage}
              alt={post.title}
              sizes="(max-width: 900px) 100vw, 900px"
              placeholderClassName={styles.placeholder}
            />
          </div>
        </div>

        <div className={`${styles.layout} container`}>
          <div>
            <MdxRenderer content={post.content} />
            <PrevNextNav prev={prev} next={next} />
            <RelatedPosts posts={related} />
            <NewsletterPlaceholder />
          </div>
          <div className={styles.tocCol}>
            <TableOfContents headings={headings} />
          </div>
        </div>
      </main>
      <WhatsAppWidget />
      <ChatWidget />
    </>
  );
}
