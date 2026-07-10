export type AnalyticsEvent =
  | "page_view"
  | "blog_view"
  | "resume_download"
  | "contact_form_submit"
  | "whatsapp_click"
  | "email_click"
  | "github_click"
  | "linkedin_click"
  | "project_click"
  | "site_search"
  | "theme_toggle"
  | "blog_search"
  | "category_click"
  | "tag_click";

type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

/** Reusable event tracking wrapper — fans out to GA4 and MS Clarity.
 * Safe to call before either script has loaded (both calls are no-ops then). */
export function trackEvent(name: AnalyticsEvent, params: EventParams = {}): void {
  if (typeof window === "undefined") return;

  try {
    window.gtag?.("event", name, params);
  } catch {
    // analytics must never break the UI
  }

  try {
    window.clarity?.("event", name);
  } catch {
    // analytics must never break the UI
  }
}
