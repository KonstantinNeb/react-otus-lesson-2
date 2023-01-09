import React from "react";
import { cleanup, render } from "@testing-library/react";
import Board from "./Board";
import { CellsData, GameSettings } from "../../types";
import { generateBoard } from "../../utils";

afterEach(cleanup);

describe("Board", () => {
  it("render all cells in Border component", () => {
    const settings: GameSettings = {
      boardSize: { x: 5, y: 5 },
      boardFillPercent: 15,
      speed: 3,
    };
    const { x, y } = settings.boardSize;
    const cellsData: CellsData = generateBoard(settings);
    const onCellClick = jest.fn();

    const { getAllByTestId } = render(
      <Board
        boardSize={settings.boardSize}
        cellsData={cellsData}
        onCellClick={onCellClick}
      />
    );

    expect(getAllByTestId(/[0-44]/)).toHaveLength(x * y);
  });
});
