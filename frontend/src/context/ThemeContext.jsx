import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem("themeMode") || "system"; // 'light' | 'dark' | 'system'
  });

  const [activeTheme, setActiveTheme] = useState("dark");

  useEffect(() => {
    const root = document.documentElement;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = () => {
      let effectiveTheme = themeMode;
      if (themeMode === "system") {
        effectiveTheme = mediaQuery.matches ? "dark" : "light";
      }

      if (effectiveTheme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
      setActiveTheme(effectiveTheme);
    };

    applyTheme();
    localStorage.setItem("themeMode", themeMode);

    const listener = () => {
      if (themeMode === "system") applyTheme();
    };

    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode((prev) => {
      if (prev === "light") return "dark";
      if (prev === "dark") return "system";
      return "light";
    });
  };

  return (
    <ThemeContext.Provider value={{ themeMode, activeTheme, toggleTheme, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
