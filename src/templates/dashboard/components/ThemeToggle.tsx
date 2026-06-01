"use client";

import { Button } from "@heroui/react";
import { useEffect, useState } from "react";

type ThemeName = "light" | "dark";

const THEME_KEY = "forgetkit-theme";

function isThemeName(value: string | null): value is ThemeName {
  return value === "light" || value === "dark";
}

function getInitialTheme(): ThemeName {
  if (typeof window === "undefined") {
    return "light";
  }

  const storedTheme = localStorage.getItem(THEME_KEY);
  return isThemeName(storedTheme) ? storedTheme : "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeName>(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const handleToggle = () => {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  };

  return (
    <Button
      aria-label="Toggle theme"
      className="h-8 min-w-0 border border-app bg-app-raised px-2.5 text-xs font-medium text-app hover:bg-app-surface"
      size="sm"
      variant="secondary"
      onClick={handleToggle}
    >
      {theme === "light" ? "Dark" : "Light"}
    </Button>
  );
}
