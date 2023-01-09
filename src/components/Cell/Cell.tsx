import React, { FC, useCallback } from "react";
import { CELL_SIZE } from "../../constants";
import { CellStyled } from "../../elements/CellStyled";
import { CellState, Coordinates } from "../../types";

interface CellProps {
  cellData: CellState;
  x: number;
  y: number;
  onClick: (coord: Coordinates) => void;
}

const Cell: FC<CellProps> = ({ cellData, x, y, onClick }) => {
  const handleOnClick = useCallback(() => onClick({ x, y }), [onClick, x, y]);
  return (
    <CellStyled
      data-testid={`${y}${x}`}
      onClick={handleOnClick}
      cellSize={CELL_SIZE}
      cellData={cellData}
    />
  );
};

export default Cell;
