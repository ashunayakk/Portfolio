"use client";

import { MagneticButton } from "@/components/effects/MagneticButton";
import { trackEvent } from "@/lib/analytics";

interface HeroCtaButtonProps {
  label: string;
  href: string;
  variant: "primary" | "outline";
}

export function HeroCtaButton({ label, href, variant }: HeroCtaButtonProps) {
  return (
    <MagneticButton>
      <a
        href={href}
        className={`btn ${variant === "primary" ? "btn-primary" : "btn-outline"}`}
        onClick={() => {
          if (href.endsWith(".pdf")) trackEvent("resume_download", { source: "hero" });
        }}
      >
        {label}
      </a>
    </MagneticButton>
  );
}
