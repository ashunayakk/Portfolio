import { prisma } from "@/lib/db";
import { listMdxSlugs } from "./mdx";
import { slugify } from "@/lib/utils";

export { slugify };

/** Since MDX (file-based) and DB posts share one /blog/[slug] namespace,
 * this must be checked against both sources before a save is allowed. */
export async function isSlugTaken(slug: string, excludePostId?: string): Promise<boolean> {
  if (listMdxSlugs().includes(slug)) return true;

  const existing = await prisma.post.findUnique({ where: { slug } });
  if (!existing) return false;
  if (excludePostId && existing.id === excludePostId) return false;
  return true;
}
