import GithubSlugger from "github-slugger";
import type { Heading } from "@/types/blog";

/** Parses ##/### headings straight out of the raw markdown source using the
 * same slugger rehype-slug uses internally, so ids here always match the
 * ids rehype-slug assigns when rendering — this is what lets the sticky
 * TOC link directly to `#<slug>` in the rendered article. */
export function extractHeadings(markdown: string): Heading[] {
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];
  const lines = markdown.split("\n");
  let inCodeBlock = false;

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const match = /^(#{2,3})\s+(.+)$/.exec(line.trim());
    const hashes = match?.[1];
    const rawText = match?.[2];
    if (hashes && rawText) {
      const depth = hashes.length;
      const text = rawText.replace(/[#*`]/g, "").trim();
      headings.push({ depth, text, slug: slugger.slug(text) });
    }
  }

  return headings;
}
