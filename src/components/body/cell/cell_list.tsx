import React from "react";

const CellList: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return <div className="row">{children}</div>;
};

export { CellList };
