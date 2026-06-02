"use client";

import { Button } from "@heroui/react";
import { useEffect, useState } from "react";
import { THEME_KEY, applyTheme, resolveInitialTheme, toggleTheme, type ThemeName } from "./theme-helpers";

function SunIcon() {
  return (
    <svg aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2.5v3M12 18.5v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2.5 12h3M18.5 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M19 14.5A7.5 7.5 0 1 1 9.5 5a6.5 6.5 0 1 0 9.5 9.5Z" />
    </svg>
  );
}

function getInitialTheme(): ThemeName {
  if (typeof window === "undefined") {
    return "light";
  }

  return resolveInitialTheme({
    storageTheme: window.localStorage.getItem(THEME_KEY),
    documentTheme: document.documentElement.getAttribute("data-theme"),
  });
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeName>(getInitialTheme);

  useEffect(() => {
    applyTheme(theme, {
      documentElement: document.documentElement,
      storage: window.localStorage,
    });
  }, [theme]);

  const handleToggle = () => {
    setTheme((currentTheme) => toggleTheme(currentTheme));
  };

  return (
    <Button
      aria-label="Toggle theme"
      className="h-8 w-8 min-w-0 border border-app bg-app-raised text-app hover:bg-app-surface"
      title="Toggle theme"
      isIconOnly
      size="sm"
      variant="secondary"
      onClick={handleToggle}
    >
      {theme === "light" ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
}
