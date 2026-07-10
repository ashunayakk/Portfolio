"use client";

import { useActionState, useState } from "react";
import dynamic from "next/dynamic";
import { CATEGORIES } from "@/lib/blog/categories";
import { slugify, cx } from "@/lib/utils";
import type { PostFormState } from "@/lib/actions/posts";
import styles from "./PostForm.module.css";

// Only ever needed inside /admin, and it's the heaviest client component in
// the app (debounced preview requests, toolbar, textarea) — not worth
// shipping in the admin route's initial JS payload until it's rendered.
const MarkdownEditor = dynamic(() => import("./MarkdownEditor").then((m) => m.MarkdownEditor), {
  loading: () => <p style={{ padding: 16, color: "var(--ink2)" }}>Loading editor...</p>,
});

export interface PostFormInitial {
  title: string;
  slug: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  coverImage: string;
  status: "DRAFT" | "PUBLISHED";
  featured: boolean;
}

const EMPTY: PostFormInitial = {
  title: "",
  slug: "",
  description: "",
  content: "",
  category: CATEGORIES[0]?.slug ?? "",
  tags: [],
  coverImage: "",
  status: "DRAFT",
  featured: false,
};

interface PostFormProps {
  action: (prevState: PostFormState, formData: FormData) => Promise<PostFormState>;
  initial?: PostFormInitial;
  submitLabel: string;
}

export function PostForm({ action, initial = EMPTY, submitLabel }: PostFormProps) {
  const [state, formAction, pending] = useActionState(action, { status: "idle" } as PostFormState);
  const [title, setTitle] = useState(initial.title);
  const [slug, setSlug] = useState(initial.slug);
  const [slugTouched, setSlugTouched] = useState(!!initial.slug);

  return (
    <form action={formAction} className={styles.form}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="title">
          Title
        </label>
        <input
          id="title"
          name="title"
          className={styles.input}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (!slugTouched) setSlug(slugify(e.target.value));
          }}
          required
        />
        {state.fieldErrors?.title && <span className={styles.fieldError}>{state.fieldErrors.title}</span>}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="slug">
          Slug
        </label>
        <input
          id="slug"
          name="slug"
          className={styles.input}
          value={slug}
          onChange={(e) => {
            setSlug(e.target.value);
            setSlugTouched(true);
          }}
          required
        />
        {state.fieldErrors?.slug && <span className={styles.fieldError}>{state.fieldErrors.slug}</span>}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className={styles.textareaSmall}
          defaultValue={initial.description}
          required
        />
        {state.fieldErrors?.description && (
          <span className={styles.fieldError}>{state.fieldErrors.description}</span>
        )}
      </div>

      <div className={styles.grid2}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="category">
            Category
          </label>
          <select id="category" name="category" className={styles.select} defaultValue={initial.category}>
            {CATEGORIES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="tags">
            Tags (comma-separated)
          </label>
          <input
            id="tags"
            name="tags"
            className={styles.input}
            defaultValue={initial.tags.join(", ")}
            placeholder="AI, LLMs, Prompt Engineering"
          />
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="coverImage">
          Cover image URL
        </label>
        <input
          id="coverImage"
          name="coverImage"
          className={styles.input}
          defaultValue={initial.coverImage}
          placeholder="https://... (or upload one from within the content editor)"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Content</label>
        <MarkdownEditor name="content" initialValue={initial.content} />
      </div>

      <div className={styles.grid2}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="status">
            Status
          </label>
          <select id="status" name="status" className={styles.select} defaultValue={initial.status}>
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
          </select>
        </div>

        <div className={styles.checkboxRow} style={{ alignSelf: "end", paddingBottom: 10 }}>
          <input id="featured" name="featured" type="checkbox" defaultChecked={initial.featured} />
          <label htmlFor="featured">Featured</label>
        </div>
      </div>

      {state.status !== "idle" && state.message && (
        <p className={cx(styles.statusMessage, state.status === "success" ? styles.success : styles.error)}>
          {state.message}
        </p>
      )}

      <div className={styles.actions}>
        <button type="submit" className="btn btn-primary" disabled={pending}>
          {pending ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
