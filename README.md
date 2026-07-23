# Ashutosh Nayak — Portfolio

Personal portfolio for Ashutosh Nayak — AI & ML Engineer, Business Analyst & Frappe Developer — rebuilt as a full Next.js 15 application with a blog, a private admin CMS, SEO, and analytics.

Live at: https://ashunayak.com

## Stack

- **Next.js 15** (App Router, TypeScript strict, React 19)
- **CSS Modules** + a hand-rolled 4-theme design system (Azure/Clay/Olive/Dark) driven by CSS custom properties — no Tailwind, so the existing bespoke visual language didn't need to be reproduced in a second system
- **Prisma + Postgres** (Neon) for blog posts authored via the admin CMS, and contact form submissions
- **MDX** (`content/blog/*.mdx`) for hand-written blog posts, rendered through the same pipeline as DB-authored posts
- **NextAuth (Auth.js v5)** with a single Credentials-based admin account (no OAuth, no user table)
- **Google Gemini** (free tier) powering the resume chatbot at `/api/chat`
- **Vercel Analytics**, **Google Analytics 4**, and **Microsoft Clarity** (GA4/Clarity are env-gated — absent entirely if their env vars aren't set)
- **Vercel Blob** for image uploads from the admin markdown editor

## Folder structure

```
app/
  page.tsx                    Home (all marketing sections)
  layout.tsx                  Root layout: fonts, theme no-flash script, analytics
  not-found.tsx / error.tsx / global-error.tsx
  sitemap.ts / robots.ts / manifest.ts
  feed.xml/route.ts           RSS feed
  api/
    chat/route.ts             Resume chatbot (Gemini)
    auth/[...nextauth]/route.ts
    admin/preview/route.ts    Markdown -> HTML for the editor's live preview
    admin/upload/route.ts     Image upload (Vercel Blob), admin-only
  blog/
    (index)/page.tsx          /blog listing — isolated in a route group so its
                               loading.tsx doesn't wrap [slug]/category (see note below)
    [slug]/page.tsx           Individual post (MDX or DB-backed)
    category/[category]/page.tsx
  admin/
    login/page.tsx            Public
    (protected)/               Everything below requires a session
      page.tsx                 Dashboard
      blogs/page.tsx           List, search, filter, publish/unpublish/feature/duplicate/delete
      blogs/new/page.tsx
      blogs/[id]/edit/page.tsx
      messages/page.tsx
      settings/page.tsx

components/
  layout/        Navbar, ThemeSwitcher, WhatsAppWidget, ChatWidget
  sections/      Hero, Work, About, Skills, Experience, Education, Certificates, Contact, ...
  blog/          PostCard, MdxRenderer, CodeBlock, TableOfContents, BlogExplorer, ...
  admin/         Sidebar, PostForm, MarkdownEditor, BlogTable, LoginForm, ...
  effects/       Reveal, CountUp, WordRotator, MouseGlow, MagneticButton
  providers/     ThemeProvider, SessionProvider

lib/
  content/       Typed data for every static section (hero.ts, projects.ts, experience.ts, ...)
  blog/          posts.ts (unifies MDX + DB), mdx.ts, db-posts.ts, categories.ts, slug.ts,
                 reading-time.ts, headings.ts, mdx-options.ts, preview.ts
  actions/       Server actions: posts.ts, messages.ts, contact.ts
  validations/   Zod schemas: post.ts, contact.ts, chat.ts
  auth.config.ts / auth.ts   Split edge-safe / full NextAuth config (see note below)
  db.ts          Prisma client singleton
  analytics.ts   trackEvent() wrapper (GA4 + Clarity)
  theme.ts       Theme tokens + the no-flash inline script
  seo.ts         SITE_URL / SITE_NAME constants

content/blog/    Hand-written MDX posts (frontmatter: title, description, coverImage,
                 category, tags, author, publishedAt, updatedAt?, featured?)
prisma/          schema.prisma + migrations
middleware.ts    Gates /admin/* using the edge-safe auth config
legacy/          The original single-file static site (index.html + chat.js), kept
                 only as a rollback reference — not part of the Next.js build.
```

## Getting started

```bash
npm install
cp .env.local.example .env.local   # fill in the values below
npx prisma migrate dev             # creates the Post/Message tables
npm run dev
```

You need a local (or remote) Postgres instance for `DATABASE_URL`/`DIRECT_URL` during development — Neon's free tier works, or a local Postgres via `brew install postgresql@16`.

To create your admin login, generate a password hash and set it as `ADMIN_PASSWORD_HASH`:

```bash
npm run seed:admin
```

### Environment variables

See `.env.local.example` for the full list with descriptions. Summary:

| Variable                                 | Required for                                        | Notes                                                  |
| ---------------------------------------- | --------------------------------------------------- | ------------------------------------------------------ |
| `DATABASE_URL`, `DIRECT_URL`         | DB-backed blog posts, contact form, admin dashboard | Neon Postgres — pooled + direct connection strings    |
| `AUTH_SECRET`                          | Admin login                                         | `openssl rand -base64 33`                            |
| `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH` | Admin login                                         | Generate the hash with`npm run seed:admin`           |
| `GEMINI_API_KEY`                       | Resume chatbot                                      | Free key at aistudio.google.com/api-keys               |
| `BLOB_READ_WRITE_TOKEN`                | Image upload in the admin editor                    | From the Vercel Blob store settings                    |
| `NEXT_PUBLIC_GA_ID`                    | Google Analytics 4                                  | Omit entirely to disable — no script loads without it |
| `NEXT_PUBLIC_CLARITY_ID`               | Microsoft Clarity                                   | Same — omit to disable                                |
| `NEXT_PUBLIC_SITE_URL`                 | Canonical URLs, sitemap, RSS, OG tags               | Defaults to the production URL if unset                |

## Working with the blog

There are two ways to author a post, and both render through the exact same pipeline (`components/blog/MdxRenderer.tsx`), so they're indistinguishable to a reader.

### Option A — MDX file (for anything you want version-controlled in git)

1. Add `content/blog/your-slug.mdx` with frontmatter:
   ```md
   ---
   title: "Your Title"
   description: "One or two sentences for cards and meta tags."
   coverImage: "/images/blog/your-image.png"
   category: "artificial-intelligence"   # must match a slug in lib/blog/categories.ts
   tags: ["AI", "Tutorials"]
   author: "Ashutosh Nayak"
   publishedAt: "2026-07-01"
   featured: false
   ---

   Your Markdown content here, including ```language code blocks.
   ```
2. Commit and deploy — MDX posts require a redeploy to appear (they're read from the filesystem at request time, not stored anywhere else).

### Option B — Admin CMS (for anything you want to publish without touching git)

1. Log in at `/admin/login`.
2. **Blogs → New post.** The editor has a toolbar, a live preview pane (split/edit/preview toggle), and an image-upload button (uploads to Vercel Blob, inserts the Markdown image tag automatically).
3. Set **Status** to Published (or leave as Draft to keep working on it later — drafts never appear on the public site or in search).
4. **Publish / Unpublish / Feature / Duplicate / Delete** are all one click from the edit page or the Blogs list — changes are live immediately, no redeploy needed.

Either way: reading time, word count, the table of contents, syntax highlighting, related articles, and prev/next links are all computed automatically — nothing to fill in by hand beyond the fields above.

### A structural note on why `/blog` has a `(index)` route group

`app/blog/(index)/page.tsx` holds the blog listing and its `loading.tsx`, deliberately separated from `app/blog/[slug]/page.tsx` and `app/blog/category/[category]/page.tsx`. During development, a `loading.tsx` at the shared `/blog` segment was found to force React's streaming SSR to commit an HTTP 200 status before an unpublished/deleted post's `notFound()` call could run — the page then rendered correct "not found" *content* but with the wrong *status code* (a "soft 404", which search engines flag). Keeping the loading skeleton scoped to only the index page via a route group avoids that Suspense boundary leaking into the dynamic routes that need to be able to return a real 404.

## Admin dashboard

`/admin` (all routes under it except `/admin/login` require a session):

- **Dashboard** — total/published/draft counts, total views, most-viewed post, latest post, unread messages, recent activity.
- **Blogs** — search, filter by draft/published, and every CRUD action.
- **Messages** — everything submitted through the public contact form, with mark read/unread and delete.
- **Settings** — a reference list of which env vars control what (there's no separate settings storage; it's all env-driven by design).

Auth is a single hardcoded admin account (via `ADMIN_EMAIL` / `ADMIN_PASSWORD_HASH`) — there's no sign-up flow and no user table, matching "only I should access it."

## SEO

- Every route has its own `generateMetadata` (or static `metadata`) — title, description, canonical URL, Open Graph, Twitter card.
- Blog posts additionally emit `Article` and `BreadcrumbList` JSON-LD; the homepage emits a `Person` schema.
- `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`, and `app/feed.xml/route.ts` are all generated dynamically from the same `getAllPosts()` used by the blog itself, so they can never drift out of sync with what's actually published.

## Analytics

`lib/analytics.ts` exports a single `trackEvent(name, params)` function that fans out to `window.gtag` and `window.clarity` (both no-ops if their scripts haven't loaded, e.g. when the env vars are unset). It's wired at every interaction point named in the original spec: page views (via a client-side route-change tracker, since GA4's own auto-pageview doesn't see Next.js client-side navigations), blog views, resume downloads, the contact form, WhatsApp/email/GitHub/LinkedIn clicks, project card clicks, blog search, category/tag clicks, and the theme switcher.

GA4 and Clarity scripts are loaded via `next/script` and are entirely absent from the page (not just disabled) when `NEXT_PUBLIC_GA_ID` / `NEXT_PUBLIC_CLARITY_ID` aren't set.

## Deploying

1. Push to GitHub, import into Vercel (framework auto-detected as Next.js).
2. Provision a Neon Postgres database (or any Postgres) and set `DATABASE_URL`/`DIRECT_URL`.
3. Provision a Vercel Blob store for `BLOB_READ_WRITE_TOKEN` (needed for admin image uploads).
4. Set the remaining environment variables listed above in Vercel's Project Settings.
5. Run `npx prisma migrate deploy` against the production database (or let Vercel's build do it if you wire it into the build command).
6. Deploy. `npm run build` runs `prisma generate` first automatically.

## Maintaining

- **Add a project or update site copy**: edit the relevant file in `lib/content/*.ts` — nothing is hardcoded into JSX, so most changes are one-file edits.
- **Add a blog category**: add it to `lib/blog/categories.ts` (the single source of truth — the Prisma `Post.category` column is a plain string validated against this list at the application layer, not a database enum, specifically so there's only one place to update).
- **Swap in real project screenshots / a profile photo**: drop files at `public/images/projects/<slug>.png` and `public/images/profile/ashutosh.jpg` matching the paths already referenced in `lib/content/projects.ts` and `lib/content/about.ts` — every image component has a graceful placeholder fallback, so nothing breaks in the meantime.
- **Rotate the admin password**: run `npm run seed:admin` again and update `ADMIN_PASSWORD_HASH` in Vercel.

## Assets

- `public/docs/` — downloadable CV, certificates, and reference documents
- `public/images/projects/`, `public/images/profile/`, `public/images/blog/` — image slots referenced by content data; safe to leave empty (placeholders render instead) until real assets are supplied
