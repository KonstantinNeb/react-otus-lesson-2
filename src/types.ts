import { CELL_STATE_ALIVE, CELL_STATE_EMPTY } from "./constants";

export type CellState = typeof CELL_STATE_ALIVE | typeof CELL_STATE_EMPTY;
export type CellsData = Array<Array<CellState>>;

export interface GameSettings {
  boardSize: BoardSize;
  boardFillPercent: number;
  speed: number;
}

export interface BoardSize {
  x: number;
  y: number;
}

export interface Coordinates {
  x: number;
  y: number;
}

export interface State {
  login: string;
}

export const enum Mode {
  PAUSE = "PAUSE",
  PLAY = "PLAY",
  STOP = "STOP",
}

export interface LocationState {
  from: {
    hash: string;
    key: string;
    pathname: string;
    search: string;
    state: null;
  };
}
