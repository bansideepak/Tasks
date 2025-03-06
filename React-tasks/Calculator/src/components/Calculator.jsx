import React, { useState } from "react";

const Calculator = () => {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState(0);

  const add = () => setResult(num1 + num2);
  const subtract = () => setResult(num1 - num2);
  const multiply = () => setResult(num1 * num2);
  const divide = () => setResult(num1 / num2);

  const reset = () => {
    setNum1("");
    setNum2("");
    setResult(null);
  };

  return (
    <div className="calculator-wrapper">
      <div className="calculator-container">
        <h1 className="calculator-title">Calculator</h1>

        <div className="input-container">
          <div className="input-group">
            <input
              className="input-field"
              type="number"
              value={num1}
              onChange={(e) => setNum1(Number(e.target.value))}
              placeholder="Enter first number"
            />
          </div>

          <div className="input-group">
            <input
              className="input-field"
              type="number"
              value={num2}
              onChange={(e) => setNum2(Number(e.target.value))}
              placeholder="Enter second number"
            />
          </div>
        </div>

        <div className="operations-container">
          <button className="operation-btn" onClick={add}>
            +
          </button>
          <button className="operation-btn" onClick={subtract}>
            −
          </button>
          <button className="operation-btn" onClick={multiply}>
            ×
          </button>
          <button className="operation-btn" onClick={divide}>
            ÷
          </button>
        </div>

        <div className="result-container">
          <p className="result-text">
            Result: <span className="result-value">{result || "0"}</span>
          </p>
        </div>

        <button className="reset-btn" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Calculator;
