import ThemeProvider from "./components/ThemeProvider";

function App() {
  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "40px 40px",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Theme Switcher</h1>
      <ThemeProvider />
    </div>
  );
}

export default App;
