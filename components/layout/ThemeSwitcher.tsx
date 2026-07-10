"use client";

import { THEMES, THEME_NAMES } from "@/lib/theme";
import { useTheme } from "@/components/providers/ThemeProvider";
import { trackEvent } from "@/lib/analytics";
import styles from "./Navbar.module.css";
import { cx } from "@/lib/utils";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className={styles.swatches} role="group" aria-label="Choose color theme">
      {THEME_NAMES.map((name) => (
        <button
          key={name}
          type="button"
          aria-label={`${name} theme`}
          aria-pressed={theme === name}
          className={cx(styles.swatch, theme === name && styles.active)}
          style={{ background: THEMES[name].accent }}
          onClick={() => {
            setTheme(name);
            trackEvent("theme_toggle", { theme: name });
          }}
        />
      ))}
    </div>
  );
}
