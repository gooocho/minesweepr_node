import React from "react";
const { useState } = React;
import { Menu } from "./menu/menu";
import { Body } from "./body/body";
import { XorshiftSeed, Rule } from "../game/types";
import { BEGINNER } from "../game/config/rules";

const Runner: React.FC<{}> = () => {
  const [rule, setRule] = useState(BEGINNER);

  const handleStart = function handleStart(rule: Rule) {
    setRule(rule);
  };

  return (
    <>
      <Menu handleStart={handleStart} />
      <hr />
      <Body rule={rule} />
    </>
  );
};

export { Runner };
