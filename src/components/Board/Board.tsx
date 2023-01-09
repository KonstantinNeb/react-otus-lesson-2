import React, { FC, memo } from "react";
import { BoardSize, CellsData, Coordinates } from "../../types";
import Cell from "../Cell/Cell";
import { CELL_SIZE } from "../../constants";
import { BoardStyled } from "../../elements/BoardStyled";

interface BoardProps {
  cellsData: CellsData;
  boardSize: BoardSize;
  onCellClick: (coord: Coordinates) => void;
}

const Board: FC<BoardProps> = memo(({ cellsData, boardSize, onCellClick }) => {
  return (
    <BoardStyled boardSize={boardSize} cellSize={CELL_SIZE} data-testid="board">
      {cellsData.map((row, iRow) => (
        <div key={iRow} style={{ display: "flex" }}>
          {row.map((cell, iCell) => (
            <Cell
              key={`${iRow}${iCell}`}
              cellData={cell}
              x={iCell}
              y={iRow}
              onClick={onCellClick}
            />
          ))}
        </div>
      ))}
    </BoardStyled>
  );
});

export default Board;
