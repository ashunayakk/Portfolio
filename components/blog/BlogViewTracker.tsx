"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export function BlogViewTracker({ slug, category }: { slug: string; category: string }) {
  useEffect(() => {
    trackEvent("blog_view", { slug, category });
  }, [slug, category]);

  return null;
}
