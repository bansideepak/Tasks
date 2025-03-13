import { useState, useEffect } from "react";
import React from "react";
import "./App.css";

function App() {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prevCount) => prevCount + 1);
      }, 1000);
      console.log("Timer starts");
    }
    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimer(0);
  };

  return (
    <div>
      <h1>{timer}</h1>
      <div>
        <button className="start-btn" onClick={handleStart}>
          Start
        </button>
        <button className="stop-btn" onClick={handleStop}>
          Stop
        </button>
        <button className="reset-btn" onClick={handleReset}>
          Reset
        </button>
      </div>
      <p> {isRunning ? "counter is running" : "counter is stopped"} </p>
    </div>
  );
}

export default App;
