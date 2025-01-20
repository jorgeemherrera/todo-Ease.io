import { useState, useEffect } from "react";
import { getThemeFromDB, saveThemeToDB } from "@utils/indexed-db/indexedDb";
import { Theme } from "@hooks/types";

const UseTheme = () => {
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

export default UseTheme;