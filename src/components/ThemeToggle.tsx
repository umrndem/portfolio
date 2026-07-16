"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import {
  themeStorageKey,
  type PortfolioTheme,
} from "@/systems/theme";

function readTheme(): PortfolioTheme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export function ThemeToggle() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    buttonRef.current?.setAttribute(
      "aria-pressed",
      String(readTheme() === "dark"),
    );
  }, []);

  function toggleTheme(event: MouseEvent<HTMLButtonElement>) {
    const nextTheme: PortfolioTheme = readTheme() === "dark" ? "light" : "dark";

    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.colorScheme = nextTheme;
    localStorage.setItem(themeStorageKey, nextTheme);
    event.currentTarget.setAttribute(
      "aria-pressed",
      String(nextTheme === "dark"),
    );
  }

  return (
    <button
      ref={buttonRef}
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label="Dark theme"
      aria-pressed="false"
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
