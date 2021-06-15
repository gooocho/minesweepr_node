import React from "react";

export class CellList extends React.Component<any, any> {
  render() {
    return (
      <div>{this.props.cellList}</div>
    );
  }
}
