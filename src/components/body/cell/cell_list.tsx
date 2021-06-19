import React from "react";
import { Cell } from "./cell";

type CellElements = React.ReactElement<Cell>[];

export class CellList extends React.Component<{cellList: CellElements}, {}> {
  render() {
    return (
      <div className="row">{this.props.cellList}</div>
    );
  }
}
