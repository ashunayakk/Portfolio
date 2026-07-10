import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxOptions } from "@/lib/blog/mdx-options";
import { CodeBlock } from "./CodeBlock";
import styles from "./prose.module.css";

const components = {
  pre: CodeBlock,
};

export function MdxRenderer({ content }: { content: string }) {
  return (
    <div className={styles.prose}>
      <MDXRemote source={content} options={mdxOptions} components={components} />
    </div>
  );
}
