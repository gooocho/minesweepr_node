import React from "react";

export class CellList extends React.Component<any, any> {
  render() {
    return (
      <div className="row">{this.props.cellList}</div>
    );
  }
}
