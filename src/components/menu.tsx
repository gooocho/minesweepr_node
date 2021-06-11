import React from "react";

export function Menu() {
  return (
    <div>
      <div>
        <p>bomb: <input type="number" value="10"/></p>
        <p>size: <input type="number" value="10" /> * <input type="number" value="10"/></p>
      </div>
      <button>start</button>
    </div>
  );
}