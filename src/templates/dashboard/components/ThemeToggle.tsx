"use client";

import { Button } from "@heroui/react";
import { useEffect, useState } from "react";
import { THEME_KEY, applyTheme, resolveInitialTheme, toggleTheme, type ThemeName } from "./theme-helpers";

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
      className="h-8 min-w-0 border border-app bg-app-raised px-2.5 text-xs font-medium text-app hover:bg-app-surface"
      size="sm"
      variant="secondary"
      onClick={handleToggle}
    >
      Theme
    </Button>
  );
}
