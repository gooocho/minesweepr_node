import React from "react";

const OpeningCell: React.FC<{
  size: number;
}> = ({ size }) => {
  return <button className={`closed${size}`} disabled />;
};

export { OpeningCell };
