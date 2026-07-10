import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import type { MDXRemoteProps } from "next-mdx-remote/rsc";

/** Fixed dark theme regardless of the site's 4-theme picker — code blocks
 * read better on one consistent dark surface than trying to map Shiki's
 * light/dark duality onto azure/clay/olive/dark. */
const prettyCodeOptions = {
  theme: "github-dark",
  keepBackground: true,
};

export const mdxOptions: NonNullable<MDXRemoteProps["options"]> = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "wrap" }],
      [rehypePrettyCode, prettyCodeOptions],
    ],
  },
};
