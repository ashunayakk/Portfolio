"use client";

import { useEffect, useState } from "react";
import styles from "./ShareButtons.module.css";

export function ShareButtons({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    setCanNativeShare(typeof navigator.share === "function");
  }, []);

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // user cancelled — no-op
      }
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard API unavailable — no-op
    }
  };

  const linkedinHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  const xHref = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;

  return (
    <div className={styles.wrap}>
      <span className={styles.label}>Share</span>
      <a href={linkedinHref} target="_blank" rel="noopener noreferrer" className={styles.btn} aria-label="Share on LinkedIn">
        in
      </a>
      <a href={xHref} target="_blank" rel="noopener noreferrer" className={styles.btn} aria-label="Share on X">
        𝕏
      </a>
      <button type="button" className={styles.btn} onClick={handleCopy} aria-label="Copy link">
        {copied ? "✓" : "🔗"}
      </button>
      {canNativeShare && (
        <button type="button" className={styles.btn} onClick={handleNativeShare} aria-label="Share">
          ↗
        </button>
      )}
    </div>
  );
}
