export type ThemeMode = "system" | "light" | "dark";
export type ResolvedTheme = "light" | "dark";

export const themeStorageKey = "umrfolio-theme";
export const themeModes: readonly ThemeMode[] = ["system", "light", "dark"];

export function isThemeMode(value: unknown): value is ThemeMode {
  return value === "system" || value === "light" || value === "dark";
}

// Applied before first paint so the correct theme is present with no flash.
// Reads the stored mode (defaulting to "system"), resolves "system" against the
// OS preference, and records both the resolved theme and the chosen mode.
export const themeBootstrapScript = `
(() => {
  try {
    var storageKey = "${themeStorageKey}";
    var stored = localStorage.getItem(storageKey);
    var mode =
      stored === "light" || stored === "dark" || stored === "system"
        ? stored
        : "system";
    var theme =
      mode === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : mode;

    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.themeMode = mode;
    document.documentElement.style.colorScheme = theme;
  } catch (e) {
    // CSS provides the light fallback if storage or matchMedia is unavailable.
  }
})();
`;
