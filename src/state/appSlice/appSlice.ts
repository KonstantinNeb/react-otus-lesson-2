import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CellsData, Coordinates, GameSettings, Mode } from "../../types";
import {
  generateBoard,
  nextGeneration,
  resizeBoard,
  toggleCell,
} from "../../utils";
import { userActions } from "../userSlice/userSlice";

export interface AppState {
  settings: GameSettings;
  cellsData: CellsData;
  mode: Mode;
}

export const initialState: AppState = {
  settings: {
    boardSize: { x: 50, y: 50 },
    boardFillPercent: 15,
    speed: 3,
  },
  cellsData: [] as CellsData,
  mode: Mode.STOP,
};

export const appSlice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    setSettings: (state, action: PayloadAction<GameSettings>) => {
      if (
        action.payload.boardSize.x !== state.settings.boardSize.x ||
        action.payload.boardSize.y !== state.settings.boardSize.y
      ) {
        state.cellsData = resizeBoard(
          state.cellsData,
          action.payload.boardSize
        );
      }

      if (action.payload.boardFillPercent !== state.settings.boardFillPercent) {
        state.cellsData = generateBoard(action.payload);
      }
      state.settings = action.payload;
    },

    setCellsData: (state, action: PayloadAction<GameSettings>) => {
      state.cellsData = generateBoard(action.payload);
    },

    initCellsData: (state, action: PayloadAction<CellsData>) => {
      state.cellsData = action.payload;
    },

    generateCellSData: (state) => {
      state.cellsData = nextGeneration(state.cellsData);
    },

    changeCellsData: (state, action: PayloadAction<Coordinates>) => {
      state.cellsData = toggleCell(action.payload, state.cellsData);
    },

    start: (state) => {
      state.mode = Mode.PLAY;
    },

    pause: (state) => {
      state.mode = Mode.PAUSE;
    },

    stop: (state) => {
      state.mode = Mode.STOP;
    },

    reStart: (state, action: PayloadAction<GameSettings>) => {
      state.cellsData = generateBoard(action.payload);
      state.settings = action.payload;
      state.mode = Mode.STOP;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userActions.logout.type, (state) => {
      state.mode = Mode.PAUSE;
    });
  },
});

export const appActions = appSlice.actions;

export default appSlice.reducer;
