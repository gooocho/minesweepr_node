import React from "react";
import { Menu } from "./menu/menu";
import { Body } from "./body/body";
import { Game } from "../game/runner/game";
import { LocalGame } from "../game/runner/local_game";

type PropsType = {};
type StateType = {game: Game};

export class Runner extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.handleStart = this.handleStart.bind(this);
  }

  handleStart(width: number, height: number, mineCount: number) {
    this.setState({
      game: LocalGame.newGame(
        width, height, mineCount, [0, 0, 0, 0]
      )
    });
  }

  render() {
    if (this.state && this.state.game) {
      return (
        <>
          <Menu handleStart={this.handleStart} />
          <hr />
          <Body game={this.state.game} />
        </>
      );
    } else {
      return (
        <>
          <Menu handleStart={this.handleStart} />
        </>
      );
    }
  }
}
