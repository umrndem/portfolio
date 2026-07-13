"use client";

import {
  themeStorageKey,
  type PortfolioTheme,
} from "@/systems/theme";

function readTheme(): PortfolioTheme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export function ThemeToggle() {
  function toggleTheme() {
    const nextTheme: PortfolioTheme = readTheme() === "dark" ? "light" : "dark";

    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.colorScheme = nextTheme;
    localStorage.setItem(themeStorageKey, nextTheme);
  }

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle color theme"
      title="Toggle color theme"
    >
      <span className="theme-toggle__disc" aria-hidden="true" />
      <span
        className="theme-toggle__label theme-toggle__label--light"
        aria-hidden="true"
      >
        Light
      </span>
      <span
        className="theme-toggle__label theme-toggle__label--dark"
        aria-hidden="true"
      >
        Dark
      </span>
    </button>
  );
}
