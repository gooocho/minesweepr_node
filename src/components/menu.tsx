import React from "react";

export class Menu extends React.Component<any, any> {
  render() {
    return (
      <div>
        <div>
          <p>here is Menu</p>
          <p>mine: <input type="number" value="10"/></p>
          <p>size: <input type="number" value="10" /> * <input type="number" value="10"/></p>
        </div>
        <button>start</button>
      </div>
    );
  }
}
