import React from "react";
import { Menu } from "./menu/menu";
import { Body } from "./body/body";
import { XorshiftSeed } from "../game/lib/xorshift_seed";

type PropsType = {};
type StateType = {
  width: number;
  height: number;
  mineCount: number;
  seed: XorshiftSeed;
};

export class Runner extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.handleStart = this.handleStart.bind(this);
  }

  handleStart(width: number, height: number, mineCount: number) {
    this.setState({
      width,
      height,
      mineCount,
      // FIXME: random seed
      seed: [0, 0, 0, 0],
    });
  }

  render() {
    if (this.state) {
      return (
        <>
          <Menu handleStart={this.handleStart} />
          <hr />
          <Body
            width={this.state.width}
            height={this.state.height}
            mineCount={this.state.mineCount}
            seed={this.state.seed}
          />
        </>
      );
    } else {
      return <Menu handleStart={this.handleStart} />;
    }
  }
}
