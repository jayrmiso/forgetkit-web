export type ThemeName = "light" | "dark";

export const THEME_KEY = "forgetkit-theme";

export function isThemeName(value: string | null): value is ThemeName {
  return value === "light" || value === "dark";
}

export function resolveTheme(value: string | null): ThemeName {
  return isThemeName(value) ? value : "light";
}

export function resolveInitialTheme({ storageTheme = null, documentTheme = null }: { storageTheme?: string | null; documentTheme?: string | null } = {}): ThemeName {
  if (isThemeName(storageTheme)) {
    return storageTheme;
  }

  if (isThemeName(documentTheme)) {
    return documentTheme;
  }

  return "light";
}

export function getThemeBootstrapScript(): string {
  return `(() => {
  const THEME_KEY = "${THEME_KEY}";
  const storedTheme = window.localStorage.getItem(THEME_KEY);
  const theme = storedTheme === "dark" || storedTheme === "light" ? storedTheme : "light";
  document.documentElement.setAttribute("data-theme", theme);
})();`;
}

export function applyTheme(theme: string | null, { documentElement, storage }: { documentElement?: { setAttribute: (name: string, value: string) => void } | null; storage?: { setItem: (key: string, value: string) => void } | null } = {}): ThemeName {
  const nextTheme = resolveTheme(theme);

  if (documentElement) {
    documentElement.setAttribute("data-theme", nextTheme);
  }

  if (storage) {
    storage.setItem(THEME_KEY, nextTheme);
  }

  return nextTheme;
}

export function toggleTheme(theme: string | null): ThemeName {
  return resolveTheme(theme) === "light" ? "dark" : "light";
}
