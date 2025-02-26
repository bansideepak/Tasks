import { useState, useEffect } from "react";

export default function ThemePreview({ theme }) {
  const [localTheme, setLocalTheme] = useState(theme);

  useEffect(() => {
    setLocalTheme(theme);
  }, [theme]);

  const themeStyles = {
    padding: "20px",
    marginTop: "20px",
    borderRadius: "10px",
    background: localTheme === "dark" ? "#333" : "#fff",
    color: localTheme === "dark" ? "#fff" : "#333",
    transition: "all 0.7s ease",
  };

  return (
    <div style={themeStyles}>
      <h3>Preview Section</h3>
      <p>Current Theme: {localTheme}</p>
    </div>
  );
}
