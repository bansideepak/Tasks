import React from "react";

function CoinDisplay({ result, isFlipping }) {
  return (
    <div className="coin-container">
      <div
        className={`coin ${isFlipping ? "flipping" : ""} ${
          !isFlipping ? result.toLowerCase() : ""
        }`}
      >
        <div className="coin-face heads">
          <span>H</span>
        </div>
        <div className="coin-face tails">
          <span>T</span>
        </div>
      </div>
      <div className="result-display">
        {isFlipping ? "Flipping..." : `Result: ${result}`}
      </div>
    </div>
  );
}

export default CoinDisplay;
