import React from "react";

type PropsType = {
  size: number;
  number: number;
};

export class OpenedCell extends React.Component<PropsType, {}> {
  render() {
    const className = `opened${this.props.size}`;
    return <div className={className}>{this.props.number}</div>;
  }
}
