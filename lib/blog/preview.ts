import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

/** Lightweight markdown -> HTML compile for the admin editor's live preview
 * pane. Deliberately skips shiki syntax highlighting (async/heavyweight,
 * not worth it for a preview that re-renders on every keystroke) — the
 * public site's MdxRenderer (components/blog/MdxRenderer.tsx) is the
 * pipeline of record for the real rendered output. */
export async function compilePreviewHtml(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(markdown);

  return String(result);
}
