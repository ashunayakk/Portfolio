export interface Category {
  slug: string;
  label: string;
}

/** Single source of truth for the 15 fixed blog categories. The Prisma
 * PostCategory enum (prisma/schema.prisma) must stay in sync with the
 * `slug` values here — Prisma enums can't import from TS, so that's the
 * one accepted point of duplication (see lib/blog/posts.ts). */
export const CATEGORIES: Category[] = [
  { slug: "artificial-intelligence", label: "Artificial Intelligence" },
  { slug: "machine-learning", label: "Machine Learning" },
  { slug: "business-analysis", label: "Business Analysis" },
  { slug: "erpnext", label: "ERPNext" },
  { slug: "frappe-framework", label: "Frappe Framework" },
  { slug: "python", label: "Python" },
  { slug: "sql", label: "SQL" },
  { slug: "data-analytics", label: "Data Analytics" },
  { slug: "devops", label: "DevOps" },
  { slug: "cloud-computing", label: "Cloud Computing" },
  { slug: "career", label: "Career" },
  { slug: "research", label: "Research" },
  { slug: "productivity", label: "Productivity" },
  { slug: "tutorials", label: "Tutorials" },
  { slug: "case-studies", label: "Case Studies" },
];

export function categoryLabel(slug: string): string {
  return CATEGORIES.find((c) => c.slug === slug)?.label ?? slug;
}

export function isValidCategory(slug: string): boolean {
  return CATEGORIES.some((c) => c.slug === slug);
}
