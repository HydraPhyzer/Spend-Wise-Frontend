"use client";

import React, { useEffect, useState } from "react";
import { LuMoon, LuSun } from "react-icons/lu";

const STORAGE_KEY = "spendwise-theme";

/**
 * Light/dark switch. The initial value is written to <html data-theme>
 * by an inline script in the root layout, so this only has to read it back.
 */
const ThemeToggle = ({ compact = false }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const current =
      document.documentElement.getAttribute("data-theme") || "light";
    setTheme(current);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch (e) {
      /* storage unavailable — the toggle still works for this session */
    }
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      className="btn btn-secondary shrink-0"
    >
      {theme === "dark" ? (
        <LuSun className="h-4 w-4" />
      ) : (
        <LuMoon className="h-4 w-4" />
      )}
      {!compact && (
        <span className="hidden sm:inline">
          {theme === "dark" ? "Light" : "Dark"}
        </span>
      )}
    </button>
  );
};

export default ThemeToggle;
