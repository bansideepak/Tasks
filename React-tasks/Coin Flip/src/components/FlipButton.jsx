import React from "react";

function FlipButton({ onClick, isFlipping }) {
  return (
    <button className="flip-button" onClick={onClick} disabled={isFlipping}>
      {isFlipping ? "Flipping..." : "Flip Coin"}
    </button>
  );
}

export default FlipButton;
