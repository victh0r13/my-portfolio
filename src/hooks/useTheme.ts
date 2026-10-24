import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "vhgx-theme";

function readInitialTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    const background = getComputedStyle(root).getPropertyValue("--bg").trim();
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", background);
  }, [theme]);

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      return;
    }
  };

  return { theme, toggleTheme };
}
