import React from "react";

export class OpenedCell extends React.Component<any, any> {
  render() {
    const className = `opened${this.props.size}`;
    return (
      <div className={className}>{this.props.number}</div>
    );
  }
}
