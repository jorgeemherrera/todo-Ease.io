import { useState, useEffect } from "react";
import { getThemeFromDB, saveThemeToDB } from "@features/task-form/indexedDb";

type Theme = "light" | "dark";

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const fetchTheme = async () => {
      const storedTheme = await getThemeFromDB();
      if (storedTheme) {
        applyTheme(storedTheme);
      }
    };
    fetchTheme();
  }, []);

  const applyTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const toggleTheme = async () => {
    const newTheme: Theme = theme === "light" ? "dark" : "light";
    applyTheme(newTheme);
    await saveThemeToDB(newTheme);
  };

  return { theme, toggleTheme };
};
