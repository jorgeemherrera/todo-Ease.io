
import { MoonIcon, SunIcon } from "@heroicons/react/16/solid";
import { useTheme } from "@hooks/use-theme/UseTheme";
import "./Header.scss";

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <h1 className="header-title">To-Do App</h1>
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
