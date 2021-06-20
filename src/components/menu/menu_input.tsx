import React from "react";

const MenuInput: React.FC<{
  name: string;
  defaultValue: string;
  handleChange: (name: string, value: string) => void;
}> = ({ name, defaultValue, handleChange }) => {
  return (
    <input
      name={name}
      type="number"
      defaultValue={defaultValue}
      onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
        handleChange(name, ev.target.value);
      }}
    />
  );
};

export { MenuInput };
