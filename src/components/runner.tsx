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
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleStart(width: number, height: number, mineCount: number) {
    this.setState({
      game: LocalGame.newGame(
        width, height, mineCount, [0, 0, 0, 0]
      )
    });
  }

  handleOpen(x: number, y: number) {
    this
      .state
      .game
      .open(x, y)
      .then(
        (updatedGame: Game) => {
          this.setState({
            game: updatedGame
          });
        },
        (rejected: any) => {
          console.info('boom(click event)');
        }
      );
  }

  render() {
    if (this.state && this.state.game) {
      return (
        <>
          <Menu handleStart={this.handleStart} />
          <hr />
          <Body
            game={this.state.game}
            handleOpen={this.handleOpen} />
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
