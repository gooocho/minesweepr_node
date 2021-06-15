import React from "react";
import { ClosedCell } from "./cell/closed_cell";
import { OpenedCell } from "./cell/opened_cell";

export class Body extends React.Component<any, any> {
  render() {
    const matrix = []
    for (let y = 0; y < 8; ++y) {
      const buttonRow = [];
      for (let x = 0; x < 9; ++x) {
        buttonRow.push(<ClosedCell size="32" />);
      }
      matrix.push(<div className="row">{buttonRow}</div>);
    }
    const openedRow = [];
    for (let x = 0; x < 9; ++x) {
      openedRow.push(<OpenedCell size="32" number="1" />);
    }
    matrix.push(<div className="row">{openedRow}</div>);

    return (
      <div>
        <p>here is Body</p>
        <div>
          { matrix }
        </div>
        <pre>
          {this.props.mineMap.print()}
        </pre>
      </div>
    );
  }
}
