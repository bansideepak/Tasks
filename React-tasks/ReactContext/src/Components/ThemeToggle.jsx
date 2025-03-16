import { useContext } from "react";
import ThemeContext from "../Context/ThemeContext";

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <label className="switch">
      <input type="checkbox" checked={darkMode} onChange={toggleTheme} />
      <span className="slider round"></span>
    </label>
  );
};

export default ThemeToggle;
