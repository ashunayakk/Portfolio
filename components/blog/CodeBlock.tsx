"use client";

import { useRef, useState, type ReactNode } from "react";
import styles from "./CodeBlock.module.css";

export function CodeBlock({ children }: { children: ReactNode }) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = preRef.current?.textContent ?? "";
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard API unavailable — silently ignore
    }
  };

  return (
    <div className={styles.wrap}>
      <button type="button" className={styles.copyBtn} onClick={handleCopy}>
        {copied ? "Copied" : "Copy"}
      </button>
      <pre ref={preRef}>{children}</pre>
    </div>
  );
}
