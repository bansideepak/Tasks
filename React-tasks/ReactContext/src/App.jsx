import { ThemeProvider } from "./Context/ThemeContext";
import ThemeToggle from "./Components/ThemeToggle";
import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <h1>Theme Switcher Demo</h1>
        <p>Click the slider below to toggle themes:</p>
        <ThemeToggle />
      </div>
    </ThemeProvider>
  );
}

export default App;
