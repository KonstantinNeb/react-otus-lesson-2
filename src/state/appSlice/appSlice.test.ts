import { CellsData, GameSettings, Mode } from "../../types";
import reducer, { appActions, AppState } from "./appSlice";

const mockLoadLocalLogin = jest.fn();
const mockSaveLocalCellsData = jest.fn();
const mockSaveLocalAppState = jest.fn();
const mockLoadLocalAppState = jest.fn(() => {
  return {} as AppState;
});

jest.doMock("../../localStorage", () => {
  return {
    loadLocalLogin: mockLoadLocalLogin,
    saveLocalCellsData: mockSaveLocalCellsData,
    saveLocalAppState: mockSaveLocalAppState,
    loadLocalAppState: mockLoadLocalAppState,
  };
});

describe("appSlice reducer", () => {
  const initialState: AppState = {
    settings: {
      boardSize: { x: 5, y: 5 },
      boardFillPercent: 15,
      speed: 3,
    },
    cellsData: [] as CellsData,
    mode: Mode.STOP,
  };

  const initialCellsData: CellsData = [
    [0, 1],
    [1, 1],
  ];

  it("should setSettings change boardFillPercent", () => {
    const newSettings: GameSettings = {
      ...initialState.settings,
      boardFillPercent: 20,
    };
    const newState = reducer(initialState, appActions.setSettings(newSettings));
    expect(newState.settings).toEqual(
      { ...initialState, settings: newSettings }.settings
    );
  });

  it("should setSettings change boardSize", () => {
    const newSettings: GameSettings = {
      ...initialState.settings,
      boardSize: { x: 10, y: 10 },
    };
    const newState = reducer(initialState, appActions.setSettings(newSettings));
    expect(newState.settings).toEqual(
      { ...initialState, settings: newSettings }.settings
    );
  });

  it("should setSettings no change boardSize", () => {
    const newSettings: GameSettings = {
      ...initialState,
      boardFillPercent: 10,
      speed: 1,
      boardSize: initialState.settings.boardSize,
    };
    const newState = reducer(initialState, appActions.setSettings(newSettings));
    expect(newState.settings).toEqual(
      { ...initialState, settings: newSettings }.settings
    );
  });

  it("should setCellsData set cellsData", () => {
    const newState = reducer(
      initialState,
      appActions.setCellsData(initialState.settings)
    );
    expect(newState.cellsData).toHaveLength(5);
    expect(newState.cellsData[0]).toHaveLength(5);
  });

  it("should changeCellsData on toggle cell in board", () => {
    const stateWithCellsDataInit: AppState = {
      ...initialState,
      cellsData: initialCellsData,
    };
    expect(stateWithCellsDataInit.cellsData[0][0]).toBe(0);
    let newState = reducer(
      stateWithCellsDataInit,
      appActions.changeCellsData({ x: 0, y: 0 })
    );
    expect(newState.cellsData[0][0]).toBe(1);
    newState = reducer(newState, appActions.changeCellsData({ x: 0, y: 0 }));
    expect(newState.cellsData[0][0]).toBe(0);
  });

  it("should changeCellsData on toggle out board", () => {
    const stateWithCellsDataInit: AppState = {
      ...initialState,
      cellsData: initialCellsData,
    };
    let newState = reducer(
      stateWithCellsDataInit,
      appActions.changeCellsData({
        x: 0,
        y: stateWithCellsDataInit.cellsData.length,
      })
    );
    expect(newState.cellsData).toEqual(stateWithCellsDataInit.cellsData);
    newState = reducer(
      stateWithCellsDataInit,
      appActions.changeCellsData({ x: -1, y: -1 })
    );
    expect(newState.cellsData).toEqual(stateWithCellsDataInit.cellsData);
    newState = reducer(
      stateWithCellsDataInit,
      appActions.changeCellsData({ x: -1, y: 0 })
    );
    expect(newState.cellsData).toEqual(stateWithCellsDataInit.cellsData);
    newState = reducer(
      stateWithCellsDataInit,
      appActions.changeCellsData({ x: 0, y: -1 })
    );
    expect(newState.cellsData).toEqual(stateWithCellsDataInit.cellsData);
    newState = reducer(
      stateWithCellsDataInit,
      appActions.changeCellsData({ x: 100, y: 100 })
    );
    expect(newState.cellsData).toEqual(stateWithCellsDataInit.cellsData);
  });

  it("start, stop, pause", () => {
    let newState = reducer(initialState, appActions.start());
    expect(newState.mode).toBe(Mode.PLAY);
    newState = reducer(newState, appActions.pause());
    expect(newState.mode).toBe(Mode.PAUSE);
    newState = reducer(newState, appActions.stop());
    expect(newState.mode).toBe(Mode.STOP);
  });

  it("reStart", () => {
    const stateWithCellsDataInit: AppState = {
      ...initialState,
      cellsData: initialCellsData,
      mode: Mode.PAUSE,
    };

    const newState = reducer(
      initialState,
      appActions.reStart(stateWithCellsDataInit.settings)
    );
    expect(newState.cellsData).toHaveLength(5);
    expect(newState.cellsData[0]).toHaveLength(5);
    expect(newState.settings).toEqual(stateWithCellsDataInit.settings);
    expect(newState.mode).toBe(Mode.STOP);
  });
});
