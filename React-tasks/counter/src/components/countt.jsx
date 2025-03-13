import React, { useState } from "react";

function dropdown({ fruits }) {
  const [item, setItem] = useState(false);

  return (
    <div>
      <button
        onClick={() => {
          setItem(!false);
        }}
      >
        fruits
      </button>
      {item && (
        <ul>
          {fruits.map((fruit, index) => (
            <li key={index}>{fruit}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default dropdown;
