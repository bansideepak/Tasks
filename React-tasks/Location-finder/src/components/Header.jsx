import React from "react";
import { MapPin, Moon, Sun } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="container header-content">
        <div className="logo">
          <MapPin size={24} />
          <span>Location Finder</span>
        </div>

        <button
          onClick={toggleTheme}
          className="theme-toggle"
          aria-label={
            theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
          }
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
