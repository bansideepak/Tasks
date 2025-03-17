import React, { useState } from "react";
import CoinDisplay from "./components/CoinDisplay";
import FlipButton from "./components/FlipButton";
import "./App.css";

function App() {
  const [result, setResult] = useState("Heads");
  const [isFlipping, setIsFlipping] = useState(false);

  function flipCoin() {
    if (isFlipping) return;

    setIsFlipping(true);

    setTimeout(() => {
      const newResult = Math.random() < 0.5 ? "Heads" : "Tails";
      setResult(newResult);
      setIsFlipping(false);
    }, 1000);
  }

  return (
    <div className="app">
      <h1>Coin Flip</h1>

      <CoinDisplay result={result} isFlipping={isFlipping} />

      <FlipButton onClick={flipCoin} isFlipping={isFlipping} />
    </div>
  );
}

export default App;
