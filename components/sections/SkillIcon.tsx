export const SKILL_ICON_PATHS: Record<string, React.ReactNode> = {
  share: (
    <>
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="6" cy="18" r="2.5" />
      <circle cx="18" cy="12" r="2.5" />
      <path d="M8.2 7.2 15.8 10.8M8.2 16.8 15.8 13.2" />
    </>
  ),
  message: (
    <path d="M4 5h16v10H9l-4 4v-4H4z" />
  ),
  chart: (
    <>
      <path d="M4 20V10M10 20V4M16 20v-7M4 20h16" />
    </>
  ),
  clipboard: (
    <>
      <rect x="6" y="4" width="12" height="17" rx="1.5" />
      <rect x="9" y="2.5" width="6" height="3" rx="1" />
      <path d="M9 10h6M9 14h6" />
    </>
  ),
  grid: (
    <>
      <rect x="4" y="4" width="7" height="7" rx="1" />
      <rect x="13" y="4" width="7" height="7" rx="1" />
      <rect x="4" y="13" width="7" height="7" rx="1" />
      <rect x="13" y="13" width="7" height="7" rx="1" />
    </>
  ),
  refresh: (
    <path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3M18 4v4h-4M6 20v-4h4" />
  ),
  flower: (
    <>
      <circle cx="12" cy="12" r="2.2" />
      <path d="M12 4a2.5 2.5 0 0 1 0 5M12 20a2.5 2.5 0 0 1 0-5M4 12a2.5 2.5 0 0 1 5 0M20 12a2.5 2.5 0 0 1-5 0M6.5 6.5a2.5 2.5 0 0 1 4.4 1.6M17.5 17.5a2.5 2.5 0 0 1-4.4-1.6M6.5 17.5a2.5 2.5 0 0 1 1.6-4.4M17.5 6.5a2.5 2.5 0 0 1-1.6 4.4" />
    </>
  ),
  monitor: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="1.5" />
      <path d="M8 20h8M12 16v4" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <circle cx="17" cy="9" r="2.4" />
      <path d="M21 20c0-2.6-1.7-4.8-4-5.6" />
    </>
  ),
};

export function SkillIcon({ name }: { name: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {SKILL_ICON_PATHS[name] ?? SKILL_ICON_PATHS.share}
    </svg>
  );
}
