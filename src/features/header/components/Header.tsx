import React, { useState, useEffect } from "react";

import "./Header.scss";
import { getThemeFromDB, saveThemeToDB } from "@features/task-form/indexedDb";
import { MoonIcon, SunIcon } from "@heroicons/react/16/solid";

const Header = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const fetchTheme = async () => {
      const storedTheme = await getThemeFromDB();
      if (storedTheme) {
        setTheme(storedTheme);
        document.documentElement.setAttribute("data-theme", storedTheme);
      }
    };
    fetchTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    await saveThemeToDB(newTheme);
  };

  return (
    <header className="header">
      <h1 className="header-title">To-Do App</h1>
      <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
        {theme === "light" ? (
          <MoonIcon className="icon" />
        ) : (
          <SunIcon className="icon" />
        )}
      </button>
    </header>
  );
};

export default Header;