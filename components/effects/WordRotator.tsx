"use client";

import { useEffect, useState } from "react";

export function WordRotator({ words, interval = 2200 }: { words: string[]; interval?: number }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  return (
    <span style={{ color: "var(--accent)" }} aria-live="polite">
      {words[index]}
    </span>
  );
}
