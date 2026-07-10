"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { postFormSchema } from "@/lib/validations/post";
import { isSlugTaken, slugify } from "@/lib/blog/slug";
import { wordCount } from "@/lib/blog/reading-time";

export interface PostFormState {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
}

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
}

function parsePostForm(formData: FormData) {
  const tagsRaw = String(formData.get("tags") ?? "");
  const tags = tagsRaw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  return {
    title: String(formData.get("title") ?? ""),
    slug: String(formData.get("slug") ?? ""),
    description: String(formData.get("description") ?? ""),
    content: String(formData.get("content") ?? ""),
    category: String(formData.get("category") ?? ""),
    tags,
    coverImage: String(formData.get("coverImage") ?? ""),
    status: String(formData.get("status") ?? "DRAFT") as "DRAFT" | "PUBLISHED",
    featured: formData.get("featured") === "on",
  };
}

function fieldErrorsFrom(issues: { path: (string | number)[]; message: string }[]): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const issue of issues) {
    const key = issue.path[0];
    if (typeof key === "string") errors[key] = issue.message;
  }
  return errors;
}

export async function createPost(_prevState: PostFormState, formData: FormData): Promise<PostFormState> {
  await requireAdmin();

  const raw = parsePostForm(formData);
  const parsed = postFormSchema.safeParse(raw);
  if (!parsed.success) {
    return { status: "error", message: "Please fix the errors below.", fieldErrors: fieldErrorsFrom(parsed.error.issues) };
  }

  const data = parsed.data;
  if (await isSlugTaken(data.slug)) {
    return { status: "error", message: "That slug is already in use.", fieldErrors: { slug: "Already in use" } };
  }

  const post = await prisma.post.create({
    data: {
      title: data.title,
      slug: data.slug,
      description: data.description,
      content: data.content,
      category: data.category,
      tags: data.tags,
      coverImage: data.coverImage || null,
      status: data.status,
      featured: data.featured,
      wordCount: wordCount(data.content),
      publishedAt: data.status === "PUBLISHED" ? new Date() : null,
    },
  });

  revalidatePath("/admin/blogs");
  revalidatePath("/blog");
  revalidatePath("/admin");
  redirect(`/admin/blogs/${post.id}/edit`);
}

export async function updatePost(id: string, _prevState: PostFormState, formData: FormData): Promise<PostFormState> {
  await requireAdmin();

  const raw = parsePostForm(formData);
  const parsed = postFormSchema.safeParse(raw);
  if (!parsed.success) {
    return { status: "error", message: "Please fix the errors below.", fieldErrors: fieldErrorsFrom(parsed.error.issues) };
  }

  const data = parsed.data;
  if (await isSlugTaken(data.slug, id)) {
    return { status: "error", message: "That slug is already in use.", fieldErrors: { slug: "Already in use" } };
  }

  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing) {
    return { status: "error", message: "Post not found." };
  }

  const wasPublished = existing.status === "PUBLISHED";
  const willBePublished = data.status === "PUBLISHED";

  await prisma.post.update({
    where: { id },
    data: {
      title: data.title,
      slug: data.slug,
      description: data.description,
      content: data.content,
      category: data.category,
      tags: data.tags,
      coverImage: data.coverImage || null,
      status: data.status,
      featured: data.featured,
      wordCount: wordCount(data.content),
      publishedAt: !wasPublished && willBePublished ? new Date() : existing.publishedAt,
    },
  });

  revalidatePath("/admin/blogs");
  revalidatePath("/blog");
  revalidatePath(`/blog/${data.slug}`);
  revalidatePath("/admin");
  return { status: "success", message: "Saved." };
}

export async function deletePost(id: string): Promise<void> {
  await requireAdmin();
  const post = await prisma.post.delete({ where: { id } });
  revalidatePath("/admin/blogs");
  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`);
  revalidatePath("/admin");
}

export async function setPostStatus(id: string, status: "DRAFT" | "PUBLISHED"): Promise<void> {
  await requireAdmin();
  const existing = await prisma.post.findUniqueOrThrow({ where: { id } });
  await prisma.post.update({
    where: { id },
    data: {
      status,
      publishedAt: status === "PUBLISHED" && !existing.publishedAt ? new Date() : existing.publishedAt,
    },
  });
  revalidatePath("/admin/blogs");
  revalidatePath(`/admin/blogs/${id}/edit`);
  revalidatePath("/blog");
  revalidatePath(`/blog/${existing.slug}`);
  revalidatePath("/admin");
}

export async function toggleFeatured(id: string, featured: boolean): Promise<void> {
  await requireAdmin();
  await prisma.post.update({ where: { id }, data: { featured } });
  revalidatePath("/admin/blogs");
  revalidatePath(`/admin/blogs/${id}/edit`);
  revalidatePath("/blog");
}

export async function duplicatePost(id: string): Promise<void> {
  await requireAdmin();
  const original = await prisma.post.findUniqueOrThrow({ where: { id } });

  let newSlug = slugify(`${original.slug}-copy`);
  let suffix = 2;
  while (await isSlugTaken(newSlug)) {
    newSlug = slugify(`${original.slug}-copy-${suffix}`);
    suffix += 1;
  }

  const copy = await prisma.post.create({
    data: {
      title: `${original.title} (copy)`,
      slug: newSlug,
      description: original.description,
      content: original.content,
      category: original.category,
      tags: original.tags,
      coverImage: original.coverImage,
      status: "DRAFT",
      featured: false,
      wordCount: original.wordCount,
      publishedAt: null,
    },
  });

  revalidatePath("/admin/blogs");
  redirect(`/admin/blogs/${copy.id}/edit`);
}
