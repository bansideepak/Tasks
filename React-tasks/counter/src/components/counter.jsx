import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    if (count >= 50) {
      return;
    }
    setCount(count + 1);
  };

  const decrement = () => {
    if (count <= 0) {
      return;
    }
    setCount(count - 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div className="counter-wrapper">
      <div className="counter-container">
        <h1 className="counter-title">Counter</h1>

        <div className="counter-display">
          <span className="counter-value">{count}</span>
          <span className="counter-limits">(Min: 0 / Max: 50)</span>
        </div>

        <div className="counter-controls">
          <div className="button-group">
            <button
              className={`counter-btn decrement ${
                count <= 0 ? "disabled" : ""
              }`}
              onClick={decrement}
              disabled={count <= 0}
            >
              -
            </button>
            <button
              className={`counter-btn increment ${
                count >= 50 ? "disabled" : ""
              }`}
              onClick={increment}
              disabled={count >= 50}
            >
              +
            </button>
          </div>

          <button
            className={`reset-btn ${count === 0 ? "disabled" : ""}`}
            onClick={reset}
            disabled={count === 0}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default Counter;
