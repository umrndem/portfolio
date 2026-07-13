export type PortfolioTheme = "light" | "dark";

export const themeStorageKey = "umar-portfolio-theme";

export const themeBootstrapScript = `
(() => {
  try {
    const storageKey = "${themeStorageKey}";
    const storedTheme = localStorage.getItem(storageKey);
    const theme =
      storedTheme === "light" || storedTheme === "dark"
        ? storedTheme
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";

    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  } catch {
    // CSS provides the light fallback if storage or matchMedia is unavailable.
  }
})();
`;
