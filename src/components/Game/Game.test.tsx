import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import Game from "./Game";
import { MemoryRouter } from "react-router-dom";
import { store } from "../../state/store";
import { Provider } from "react-redux";
import { appActions } from "../../state/appSlice/appSlice";
import { CellsData } from "../../types";

afterEach(cleanup);

jest.mock("../../localStorage", () => {
  const mockData = {
    login: "%user%",
    appState: {
      settings: {
        boardSize: { x: 50, y: 50 },
        boardFillPercent: 15,
        speed: 3,
      },
      cellsData: [] as CellsData,
      mode: "stop",
    },
  };
  return {
    saveLocalAppState: jest.fn(),
    loadLocalLogin: jest.fn(() => "%user%"),
    loadLocalAppState: jest.fn(() => mockData.appState),
  };
});

describe("Game", () => {
  it("should buttons work", () => {
    jest.spyOn(appActions, "setSettings");

    const { getByTestId, getByText, queryByTestId } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Game />
        </MemoryRouter>
      </Provider>
    );

    expect(getByText("«Game of life»")).toBeInTheDocument();
    expect(getByTestId("greetingsUser")).toBeInTheDocument();
    expect(getByTestId("greetingsUser")).toHaveTextContent("Hello, %user%!");
    expect(getByTestId("l-btn-logout")).toBeInTheDocument();
    expect(getByTestId("board")).toBeInTheDocument();
    expect(getByTestId("settingsGame")).toBeInTheDocument();

    const inputBoardSizeX = getByTestId("inputBoardSizeX");
    fireEvent.change(inputBoardSizeX, {
      target: { value: 60 },
    });
    fireEvent.click(getByTestId("s-btn-save"));
    expect(appActions.setSettings).toHaveBeenCalledTimes(2);
    expect(getByTestId(`${0}${59}`)).toBeInTheDocument();

    fireEvent.click(getByTestId("s-btn-start"));
    expect(queryByTestId("s-btn-start")).toBeNull();
    expect(getByTestId("s-btn-pause")).toBeInTheDocument();
    fireEvent.click(getByTestId("s-btn-pause"));
    expect(queryByTestId("s-btn-pause")).toBeNull();
    expect(queryByTestId("s-btn-start")).toBeInTheDocument();
  });
});
