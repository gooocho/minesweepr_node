import React from "react";
import { CellList } from "./cell/cell_list";
import { ClosedCell } from "./cell/closed_cell";
import { OpenedCell } from "./cell/opened_cell";

export class Body extends React.Component<any, any> {
  render() {
    const localRunner = this.props.localRunner;

    const matrix = [];
    console.info(localRunner.height, localRunner.width);
    for (let y = 0; y < localRunner.height; ++y) {
      const cellList = [];
      for (let x = 0; x < localRunner.width; ++x) {
        if (localRunner.isOpened(x, y)) {
          cellList.push(<OpenedCell size="32" />);
        } else {
          cellList.push(<ClosedCell size="32" />);
        }
      }
      matrix.push(<CellList cellList={cellList} />);
    }

    return (
      <div>
        <p>here is Body</p>
        <div>
          { matrix }
        </div>
        <pre>
          { localRunner.mineMap.print() }
        </pre>
      </div>
    );
  }
}
