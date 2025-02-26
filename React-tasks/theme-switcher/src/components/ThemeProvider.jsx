import { useState } from "react";
import ThemePreview from "./ThemePreview";

export default function ThemeProvider() {
  const [currentTheme, setTheme] = useState("light");

  return (
    <div style={{ padding: "10px" }}>
      <button onClick={() => setTheme("dark")} style={{ marginRight: "10px" }}>
        Dark Mode
      </button>
      <button onClick={() => setTheme("light")}>Light Mode</button>
      <ThemePreview theme={currentTheme} />
    </div>
  );
}
