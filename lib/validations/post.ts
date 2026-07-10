import { z } from "zod";
import { CATEGORIES } from "@/lib/blog/categories";

const categorySlugs = CATEGORIES.map((c) => c.slug) as [string, ...string[]];

export const postFormSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200),
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .max(200)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens only"),
  description: z.string().trim().min(1, "Description is required").max(400),
  content: z.string().trim().min(1, "Content is required"),
  category: z.enum(categorySlugs, { message: "Choose a valid category" }),
  tags: z.array(z.string().trim().min(1)).max(10),
  coverImage: z.string().trim().optional().default(""),
  status: z.enum(["DRAFT", "PUBLISHED"]),
  featured: z.boolean().default(false),
});

export type PostFormInput = z.infer<typeof postFormSchema>;
