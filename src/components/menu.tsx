import React from "react";

export class Menu extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <div>
          <p>here is Menu</p>
          <p>mine: <input type="number" defaultValue="10" /></p>
          <p>size: <input type="number" defaultValue="10" /> * <input type="number" defaultValue="10" /></p>
        </div>
        <button>start</button>
      </div>
    );
  }
}
