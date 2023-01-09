import { CELL_STATE_ALIVE, CELL_STATE_EMPTY } from "./constants";
import {
  BoardSize,
  CellsData,
  CellState,
  Coordinates,
  GameSettings,
} from "./types";

export const generateBoardXY = (
  boardSize: BoardSize,
  init: CellState
): CellsData => {
  return Array.from(Array(boardSize.y)).map(() =>
    Array.from(Array(boardSize.x)).map(() => init)
  );
};

export const generateBoard = (settings: GameSettings): CellsData => {
  const { boardSize, boardFillPercent } = settings;
  const isReverseFill = boardFillPercent > 50;
  const boardCellsCount = boardSize.x * boardSize.y;
  const countFillCells = Math.floor(boardCellsCount * (boardFillPercent / 100));
  let countFill = isReverseFill
    ? boardCellsCount - countFillCells
    : countFillCells;
  const init = isReverseFill ? CELL_STATE_ALIVE : CELL_STATE_EMPTY;
  const fill = isReverseFill ? CELL_STATE_EMPTY : CELL_STATE_ALIVE;
  const cellsData = generateBoardXY(boardSize, init);
  while (countFill > 0) {
    const x = Math.floor(Math.random() * boardSize.x);
    const y = Math.floor(Math.random() * boardSize.y);
    if (cellsData[y][x] !== fill) {
      cellsData[y][x] = fill;
      countFill--;
    }
  }
  return cellsData;
};

export const isAlive = (
  cellsData: CellsData,
  x: number,
  y: number
): CellState => {
  if (y < 0 || y >= cellsData.length || x < 0 || x >= cellsData[y].length) {
    return CELL_STATE_EMPTY;
  }
  return cellsData[y][x];
};

export const countSurrounding = (
  cellsData: CellsData,
  x: number,
  y: number
): number => {
  return (
    isAlive(cellsData, x - 1, y - 1) +
    isAlive(cellsData, x, y - 1) +
    isAlive(cellsData, x + 1, y - 1) +
    isAlive(cellsData, x - 1, y) +
    isAlive(cellsData, x + 1, y) +
    isAlive(cellsData, x - 1, y + 1) +
    isAlive(cellsData, x, y + 1) +
    isAlive(cellsData, x + 1, y + 1)
  );
};

export const getNewState = (
  cellsData: CellsData,
  x: number,
  y: number
): CellState => {
  const numAlive = countSurrounding(cellsData, x, y);
  return numAlive === 3 ||
    (numAlive === 2 && cellsData[y][x] === CELL_STATE_ALIVE)
    ? CELL_STATE_ALIVE
    : CELL_STATE_EMPTY;
};

export const nextGeneration = (cellsData: CellsData): CellsData => {
  const newCellsData = generateBoardXY(
    { x: cellsData[0].length, y: cellsData.length },
    CELL_STATE_EMPTY
  );
  for (let y = 0; y < cellsData.length; y++) {
    for (let x = 0; x < cellsData[y].length; x++) {
      newCellsData[y][x] = getNewState(cellsData, x, y);
    }
  }
  return newCellsData;
};

export const resizeBoard = (
  cellsData: CellsData,
  boardSize: BoardSize
): CellsData => {
  let newCellsData: CellsData = cellsData;
  const { x, y } = boardSize;
  if (cellsData.length !== y) {
    if (cellsData.length > y) {
      newCellsData = cellsData.slice(0, y);
    } else if (cellsData.length < y) {
      newCellsData = [
        ...cellsData,
        ...generateBoardXY({ y: y - cellsData.length, x }, CELL_STATE_EMPTY),
      ];
    }
  }
  newCellsData = newCellsData.map((row: CellState[]): CellState[] => {
    if (row.length === x) {
      return row;
    }
    return row.length > x
      ? row.slice(0, x)
      : [
          ...row,
          ...Array.from(Array(x - row.length)).map<CellState>(
            () => CELL_STATE_EMPTY
          ),
        ];
  });
  return newCellsData;
};

export const toggleCell = (
  coord: Coordinates,
  cellsData: CellsData
): CellsData => {
  const { x, y } = coord;
  if (y >= cellsData.length || y < 0) return cellsData;
  else if (x < 0 || x >= cellsData[y].length) return cellsData;
  else {
    const newCellsData = [...cellsData];
    newCellsData[y][x] =
      newCellsData[y][x] === CELL_STATE_ALIVE
        ? CELL_STATE_EMPTY
        : CELL_STATE_ALIVE;
    return newCellsData;
  }
};

export const speedToMs = (speed: number): number => {
  switch (speed) {
    case 1:
      return 1000;
    case 2:
      return 500;
    case 3:
      return 250;
    case 4:
      return 100;
    default:
      return 500;
  }
};
