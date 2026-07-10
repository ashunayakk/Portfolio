export type ThemeName = "azure" | "clay" | "olive" | "dark";

export interface ThemeTokens {
  bg: string;
  panel: string;
  panel2: string;
  ink: string;
  ink2: string;
  line: string;
  navbg: string;
  accent: string;
  glow: string;
  bgImage: string;
}

const warm = {
  panel: "#ece3d4",
  panel2: "#e4d8c5",
  ink: "#221d17",
  ink2: "#7a7062",
  line: "rgba(34,29,23,0.12)",
  navbg: "rgba(243,238,228,0.82)",
};

export const THEMES: Record<ThemeName, ThemeTokens> = {
  azure: {
    bg: "#faf9f5",
    panel: "#f5f2ed",
    panel2: "#ece8e0",
    ink: "#0e1b2e",
    ink2: "#566177",
    line: "rgba(14,27,46,0.10)",
    navbg: "rgba(250,249,245,0.86)",
    accent: "#2f6bed",
    glow: "rgba(47,107,237,0.22)",
    bgImage: "linear-gradient(180deg, #f5f1eb 0%, #faf9f5 55%)",
  },
  clay: {
    bg: "#f3eee4",
    ...warm,
    accent: "#bd5f38",
    glow: "rgba(189,95,56,0.16)",
    bgImage:
      "radial-gradient(1000px 600px at 84% -6%, rgba(189,95,56,0.10), transparent 60%), linear-gradient(180deg, #f6f1e7 0%, #f3eee4 44%)",
  },
  olive: {
    bg: "#f3eee4",
    ...warm,
    accent: "#6f7a3c",
    glow: "rgba(111,122,60,0.18)",
    bgImage:
      "radial-gradient(1000px 600px at 84% -6%, rgba(111,122,60,0.11), transparent 60%), linear-gradient(180deg, #f6f3e7 0%, #f3eee4 44%)",
  },
  dark: {
    bg: "#0b0d10",
    panel: "#14171c",
    panel2: "#1c2027",
    ink: "#e8eaef",
    ink2: "#8992a3",
    line: "rgba(232,234,239,0.10)",
    navbg: "rgba(11,13,16,0.85)",
    accent: "#8b7cff",
    glow: "rgba(139,124,255,0.24)",
    bgImage:
      "radial-gradient(1000px 600px at 84% -6%, rgba(139,124,255,0.12), transparent 60%), linear-gradient(180deg, #0d1014 0%, #0b0d10 55%)",
  },
};

export const THEME_NAMES: ThemeName[] = ["azure", "clay", "olive", "dark"];
export const DEFAULT_THEME: ThemeName = "azure";

export function isThemeName(value: string | null | undefined): value is ThemeName {
  return !!value && (THEME_NAMES as string[]).includes(value);
}

export function themeToCssVars(theme: ThemeTokens): string {
  return [
    `--bg:${theme.bg}`,
    `--panel:${theme.panel}`,
    `--panel2:${theme.panel2}`,
    `--ink:${theme.ink}`,
    `--ink2:${theme.ink2}`,
    `--line:${theme.line}`,
    `--navbg:${theme.navbg}`,
    `--accent:${theme.accent}`,
    `--glow:${theme.glow}`,
    `--bg-image:${theme.bgImage}`,
  ].join(";");
}

/** Inline, render-blocking script string injected into <head> to set the
 * theme before first paint. Must stay dependency-free and synchronous —
 * this is what prevents the old site's Clay/Azure hydration flash. */
export const NO_FLASH_THEME_SCRIPT = `(function(){try{var t=localStorage.getItem('theme');var themes=${JSON.stringify(THEME_NAMES)};if(!t||themes.indexOf(t)===-1){t='${DEFAULT_THEME}';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','${DEFAULT_THEME}');}})();`;
