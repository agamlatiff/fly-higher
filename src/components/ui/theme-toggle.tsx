"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check initial theme
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);

    if (newIsDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // Avoid hydration mismatch
  if (!mounted) {
    return (
      <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition text-gray-500">
        <span className="material-symbols-outlined text-sm">dark_mode</span>
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition text-gray-500 dark:text-gray-400"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <span className="material-symbols-outlined text-sm">light_mode</span>
      ) : (
        <span className="material-symbols-outlined text-sm">dark_mode</span>
      )}
    </button>
  );
}
