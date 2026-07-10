"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./PostCard.module.css";

interface PostCoverImageProps {
  src: string;
  alt: string;
  sizes: string;
  placeholderClassName?: string;
}

export function PostCoverImage({ src, alt, sizes, placeholderClassName }: PostCoverImageProps) {
  const [errored, setErrored] = useState(false);

  if (!src || errored) {
    return <span className={placeholderClassName ?? styles.placeholder}>{alt.slice(0, 2).toUpperCase()}</span>;
  }

  return (
    <Image src={src} alt={alt} fill sizes={sizes} style={{ objectFit: "cover" }} onError={() => setErrored(true)} />
  );
}
