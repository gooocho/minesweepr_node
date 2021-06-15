import React from "react";

export class ClosedCell extends React.Component<any, any> {
  render() {
    const className = `closed${this.props.size}`;
    return (
      <button className={className} />
    );
  }
}
