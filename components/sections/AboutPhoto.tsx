"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./About.module.css";

export function AboutPhoto({ src, alt }: { src: string; alt: string }) {
  const [errored, setErrored] = useState(false);

  return (
    <div className={styles.photoWrap}>
      {!errored && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 900px) 100vw, 420px"
          style={{ objectFit: "cover", objectPosition: "center 20%" }}
          onError={() => setErrored(true)}
        />
      )}
      {errored && <span className={styles.photoPlaceholder}>AN</span>}
    </div>
  );
}
