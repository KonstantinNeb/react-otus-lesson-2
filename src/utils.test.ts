import { cleanup } from "@testing-library/react";
import { CELL_STATE_ALIVE } from "./constants";
import { BoardSize, CellsData, CellState, GameSettings } from "./types";
import {
  countSurrounding,
  generateBoard,
  generateBoardXY,
  getNewState,
  isAlive,
  nextGeneration,
  resizeBoard,
  speedToMs,
  toggleCell,
} from "./utils";

afterEach(cleanup);

const getCountAlive = (board: CellsData) =>
  board.reduce(
    (sum: number, row: CellState[]) =>
      sum +
      row.reduce(
        (sumRow: number, cellState: CellState) => sumRow + cellState,
        0
      ),
    0
  );

describe("Utils", () => {
  it("should generateBoardXY 3x3 cellStateAlive", () => {
    const boardSize: BoardSize = { x: 3, y: 3 };
    const board: CellsData = generateBoardXY(boardSize, CELL_STATE_ALIVE);
    expect(board).toEqual([
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ]);
  });

  it("should generateBoard 10x10 75%", () => {
    const settings: GameSettings = {
      boardSize: { x: 10, y: 10 },
      boardFillPercent: 75,
      speed: 3,
    };
    const {
      boardSize: { x, y },
      boardFillPercent,
    } = settings;

    const board = generateBoard(settings);
    expect(board).toHaveLength(x);
    expect(board[0]).toHaveLength(y);
    expect(getCountAlive(board)).toEqual((x * y * boardFillPercent) / 100);
  });

  it("should resizeBoard from 100x100 to 10x10 30%", () => {
    const settings: GameSettings = {
      boardSize: { x: 100, y: 100 },
      boardFillPercent: 30,
      speed: 3,
    };

    const board = generateBoard(settings);
    const countAlive = getCountAlive(board);
    const newBoardSize = { x: 10, y: 10 };
    const newBoard = resizeBoard(board, newBoardSize);
    expect(newBoard).toHaveLength(newBoardSize.y);
    expect(newBoard[0]).toHaveLength(newBoardSize.x);
    const newCountAlive = getCountAlive(board);
    expect(countAlive).toBe(newCountAlive);
  });

  it("should resizeBoard from 10x10 to 100x100 30%", () => {
    const settings: GameSettings = {
      boardSize: { x: 10, y: 10 },
      boardFillPercent: 30,
      speed: 3,
    };

    const board = generateBoard(settings);
    const countAlive = getCountAlive(board);
    let newBoardSize = { x: 100, y: 100 };
    let newBoard = resizeBoard(board, newBoardSize);
    expect(newBoard).toHaveLength(newBoardSize.y);
    expect(newBoard[0]).toHaveLength(newBoardSize.x);
    const newCountAlive = getCountAlive(board);
    expect(countAlive).toBe(newCountAlive);
    newBoardSize = { x: 50, y: 100 };
    newBoard = resizeBoard(newBoard, newBoardSize);
    expect(newBoard).toHaveLength(newBoardSize.y);
    expect(newBoard[0]).toHaveLength(newBoardSize.x);
    newBoardSize = { x: 50, y: 50 };
    newBoard = resizeBoard(newBoard, newBoardSize);
    expect(newBoard).toHaveLength(newBoardSize.y);
    expect(newBoard[0]).toHaveLength(newBoardSize.x);
  });

  const cellsData: CellsData = [
    [0, 0, 1, 0],
    [0, 1, 0, 1],
    [0, 1, 0, 0],
  ];

  it("should check isAlive cell", () => {
    expect(isAlive(cellsData, 0, 0)).toBe(0);
    expect(isAlive(cellsData, 2, 0)).toBe(1);
    expect(isAlive(cellsData, 1, 1)).toBe(1);
    expect(isAlive(cellsData, 2, 1)).toBe(0);
    expect(isAlive(cellsData, 1, 2)).toBe(1);
  });

  it("countSurrounding", () => {
    expect(countSurrounding(cellsData, 0, 0)).toBe(1);
    expect(countSurrounding(cellsData, 1, 1)).toBe(2);
    expect(countSurrounding(cellsData, 2, 1)).toBe(4);
    expect(countSurrounding(cellsData, 2, 2)).toBe(3);
  });

  it("getNewState", () => {
    expect(getNewState(cellsData, 0, 0)).toBe(0);
    expect(getNewState(cellsData, 1, 1)).toBe(1);
    expect(getNewState(cellsData, 2, 1)).toBe(0);
    expect(getNewState(cellsData, 2, 2)).toBe(1);
  });

  it("nextGeneration", () => {
    expect(nextGeneration(cellsData)).toStrictEqual([
      [0, 0, 1, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
    ]);
  });

  it("toggleCell", () => {
    let coord = { x: 0, y: 0 };
    let newCellsData = toggleCell(coord, cellsData);
    expect(newCellsData).toHaveLength(3);
    expect(newCellsData[0]).toHaveLength(4);
    expect(newCellsData[coord.y][coord.x]).toBe(1);
    coord = { x: -1, y: 0 };
    newCellsData = toggleCell(coord, cellsData);
    expect(newCellsData).toEqual(cellsData);
    coord = { x: cellsData.length + 1, y: 0 };
    newCellsData = toggleCell(coord, cellsData);
    expect(newCellsData).toEqual(cellsData);
    coord = { x: 0, y: -1 };
    newCellsData = toggleCell(coord, cellsData);
    expect(newCellsData).toEqual(cellsData);
    coord = { x: 0, y: cellsData.length + 1 };
    newCellsData = toggleCell(coord, cellsData);
    expect(newCellsData).toEqual(cellsData);
    coord = { x: 4, y: 0 };
    newCellsData = toggleCell(coord, cellsData);
    expect(newCellsData).toEqual(cellsData);
    coord = { x: 6, y: 0 };
    newCellsData = toggleCell(coord, cellsData);
    expect(newCellsData).toEqual(cellsData);
  });

  it("speedToMs", () => {
    expect(speedToMs(1)).toBe(1000);
    expect(speedToMs(2)).toBe(500);
    expect(speedToMs(3)).toBe(250);
    expect(speedToMs(4)).toBe(100);
    expect(speedToMs(5)).toBe(500);
  });
});
