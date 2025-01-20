
import { MoonIcon, SunIcon } from "@heroicons/react/16/solid";
import { UseTheme } from "@hooks/use-theme";
import "./Header.scss";

const Header: React.FC = () => {
  const { theme, toggleTheme } = UseTheme();

  return (
    <header className="header">
      <h2 className="header-title">To-Do App</h2>
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      >
        {theme === "light" ? <MoonIcon className="icon" /> : <SunIcon className="icon" />}
      </button>
    </header>
  );
};

export default Header;
