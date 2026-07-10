"use client";

import type { AnchorHTMLAttributes } from "react";
import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";

interface TrackedLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  event: AnalyticsEvent;
  eventParams?: Record<string, string | number | boolean | undefined>;
}

export function TrackedLink({ event, eventParams, children, ...anchorProps }: TrackedLinkProps) {
  return (
    <a {...anchorProps} onClick={() => trackEvent(event, eventParams)}>
      {children}
    </a>
  );
}
