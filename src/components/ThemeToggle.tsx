"use client";

import { useEffect, useState } from "react";
import {
  isThemeMode,
  themeModes,
  themeStorageKey,
  type ResolvedTheme,
  type ThemeMode,
} from "@/systems/theme";

const modeLabels: Record<ThemeMode, string> = {
  system: "System",
  light: "Light",
  dark: "Dark",
};

function systemTheme(): ResolvedTheme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function resolveTheme(mode: ThemeMode): ResolvedTheme {
  return mode === "system" ? systemTheme() : mode;
}

function applyTheme(theme: ResolvedTheme, mode: ThemeMode) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.dataset.themeMode = mode;
  root.style.colorScheme = theme;
}

export function ThemeToggle() {
  // Start from the mode the bootstrap script recorded, so the button matches
  // what is already painted (no flash, no hydration surprise).
  const [mode, setMode] = useState<ThemeMode>("system");

  useEffect(() => {
    // Read the stored mode directly (don't depend on the bootstrap having set
    // data-theme-mode) and re-apply, so a stale cached bootstrap can't leave the
    // control showing "system" while a stored light/dark theme is painted.
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(themeStorageKey);
    } catch {
      // Fall back to whatever the bootstrap recorded on the element.
      stored = document.documentElement.dataset.themeMode ?? null;
    }
    const restored: ThemeMode = isThemeMode(stored) ? stored : "system";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMode(restored);
    applyTheme(resolveTheme(restored), restored);
  }, []);

  // While following the system, react to *future* OS preference changes only.
  // Deliberately no immediate apply here: on mount `mode` is still the initial
  // "system" before the restore effect runs, so applying now would clobber a
  // stored light/dark theme. The restore effect and cycleMode already set it.
  useEffect(() => {
    if (mode !== "system") return;
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const sync = () => applyTheme(systemTheme(), "system");
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, [mode]);

  function cycleMode() {
    const next =
      themeModes[(themeModes.indexOf(mode) + 1) % themeModes.length];
    setMode(next);
    applyTheme(resolveTheme(next), next);
    try {
      localStorage.setItem(themeStorageKey, next);
    } catch {
      // The in-memory state and applied theme still hold without storage.
    }
  }

  const label = modeLabels[mode];

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={cycleMode}
      aria-label={`Theme: ${label}. Click to change.`}
      title="Change color theme (system / light / dark)"
    >
      <span
        className={`theme-toggle__disc theme-toggle__disc--${mode}`}
        aria-hidden="true"
      />
      <span className="theme-toggle__label">{label}</span>
    </button>
  );
}
