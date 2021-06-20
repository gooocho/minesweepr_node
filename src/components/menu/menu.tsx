import React from "react";
const { useState } = React;
import { MenuInput } from "./menu_input";

const DEFAULT_WIDTH_STR = "9";
const DEFAULT_HEIGHT_STR = "9";
const DEFAULT_MINECOUNT_STR = "10";

const Menu: React.FC<{
  handleStart: (menuRule: {
    width: number;
    height: number;
    mineCount: number;
  }) => void;
}> = ({ handleStart }) => {
  const [menuRule, setMenuRules] = useState({
    width: Number(DEFAULT_WIDTH_STR),
    height: Number(DEFAULT_HEIGHT_STR),
    mineCount: Number(DEFAULT_MINECOUNT_STR),
  });

  const handleChange = function handleChange(
    state_name: string,
    value: string
  ) {
    switch (state_name) {
      case "width":
      case "height":
      case "mineCount":
        setMenuRules((current) => {
          return {
            ...current,
            [state_name]: Number(value),
          };
        });
        break;
      default:
      // noop
    }
  };

  return (
    <div>
      <div>
        <p>
          size:
          <MenuInput
            name="width"
            defaultValue={DEFAULT_WIDTH_STR}
            handleChange={handleChange}
          />
          *
          <MenuInput
            name="height"
            defaultValue={DEFAULT_HEIGHT_STR}
            handleChange={handleChange}
          />
        </p>
        <p>
          mine:
          <MenuInput
            name="mine_count"
            defaultValue={DEFAULT_MINECOUNT_STR}
            handleChange={handleChange}
          />
        </p>
      </div>
      <button
        onClick={(ev: React.MouseEvent<HTMLButtonElement>) => {
          handleStart(menuRule);
        }}
      >
        start
      </button>
    </div>
  );
};

export { Menu };
