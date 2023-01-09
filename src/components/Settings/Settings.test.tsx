import { render, cleanup, fireEvent } from "@testing-library/react";
import React from "react";
import { GameSettings, Mode } from "../../types";
import Settings from "./Settings";

afterEach(cleanup);

const initialGameSettings: GameSettings = {
  boardSize: { x: 50, y: 50 },
  boardFillPercent: 15,
  speed: 3,
};

const {
  boardSize: { x, y },
  boardFillPercent,
  speed,
} = initialGameSettings;

describe("Settings", () => {
  it("render", () => {
    const { getByTestId, queryByTestId } = render(
      <Settings
        onChangeSettings={() => null}
        onPause={() => null}
        onReStart={() => null}
        onStart={() => null}
        settings={initialGameSettings}
        mode={Mode.STOP}
      />
    );

    const inputBoardSizeX = getByTestId("inputBoardSizeX");
    expect(inputBoardSizeX).toBeInTheDocument();
    expect(inputBoardSizeX).toHaveDisplayValue(`${x}`);

    const inputBoardSizeY = getByTestId("inputBoardSizeY");
    expect(inputBoardSizeY).toBeInTheDocument();
    expect(inputBoardSizeY).toHaveDisplayValue(`${y}`);

    const inputSpeed = getByTestId("inputSpeed");
    expect(inputSpeed).toBeInTheDocument();
    expect(inputSpeed).toHaveDisplayValue(`${speed}`);

    const inputBoardFillPercent = getByTestId("inputBoardFillPercent");
    expect(inputBoardFillPercent).toBeInTheDocument();
    expect(inputBoardFillPercent).toBeEnabled();
    expect(inputBoardFillPercent).toHaveDisplayValue(`${boardFillPercent}`);

    expect(getByTestId("s-btn-save")).toBeDisabled();
    expect(getByTestId("s-btn-cancel")).toBeDisabled();
    expect(getByTestId("s-btn-start")).toBeInTheDocument();
    expect(getByTestId("s-btn-start")).toHaveTextContent(/Play/);
    expect(queryByTestId("s-btn-pause")).toBeNull();
    expect(queryByTestId("s-btn-reStart")).toBeNull();
  });

  it("input settings", () => {
    const newGameSettings: GameSettings = {
      boardSize: { x: 70, y: 30 },
      boardFillPercent: 25,
      speed: 4,
    };

    const {
      boardSize: { x, y },
      boardFillPercent,
      speed,
    } = newGameSettings;

    const onChangeSettings = jest.fn();
    const { getByTestId } = render(
      <Settings
        onChangeSettings={onChangeSettings}
        onPause={() => null}
        onReStart={() => null}
        onStart={() => null}
        settings={initialGameSettings}
        mode={Mode.STOP}
      />
    );
    const inputBoardSizeX = getByTestId("inputBoardSizeX");
    fireEvent.change(inputBoardSizeX, { target: { value: x } });
    expect(inputBoardSizeX).toHaveValue(`${x}`);

    const inputBoardSizeY = getByTestId("inputBoardSizeY");
    fireEvent.change(inputBoardSizeY, { target: { value: y } });
    expect(inputBoardSizeY).toHaveValue(`${y}`);

    const inputSpeed = getByTestId("inputSpeed");
    fireEvent.change(inputSpeed, { target: { value: speed } });
    expect(inputSpeed).toHaveValue(`${speed}`);

    const inputBoardFillPercent = getByTestId("inputBoardFillPercent");
    fireEvent.change(inputBoardFillPercent, {
      target: { value: boardFillPercent },
    });
    expect(inputBoardFillPercent).toHaveValue(`${boardFillPercent}`);

    expect(getByTestId("s-btn-save")).toBeEnabled();
    expect(getByTestId("s-btn-cancel")).toBeEnabled();

    fireEvent.click(getByTestId("s-btn-save"));
    expect(onChangeSettings).toHaveBeenCalledTimes(1);
    expect(onChangeSettings).toBeCalledWith(newGameSettings);
  });

  it("play mode", () => {
    const onPause = jest.fn();
    const onReStart = jest.fn();
    const onStart = jest.fn();
    const onChangeSettings = jest.fn();
    const { getByTestId, queryByTestId } = render(
      <Settings
        onChangeSettings={onChangeSettings}
        onPause={onPause}
        onReStart={onReStart}
        onStart={onStart}
        settings={initialGameSettings}
        mode={Mode.PLAY}
      />
    );

    const inputBoardFillPercent = getByTestId("inputBoardFillPercent");
    expect(inputBoardFillPercent).toBeInTheDocument();
    expect(inputBoardFillPercent).toBeDisabled();

    expect(queryByTestId("s-btn-start")).toBeNull();
    expect(getByTestId("s-btn-pause")).toBeInTheDocument();
    expect(getByTestId("s-btn-reStart")).toBeInTheDocument();

    fireEvent.click(getByTestId("s-btn-pause"));
    expect(onPause).toBeCalledTimes(1);

    fireEvent.click(getByTestId("s-btn-reStart"));
    expect(onReStart).toBeCalledTimes(1);
  });

  test("button cancel should reset changes", () => {
    const { getByTestId } = render(
      <Settings
        onPause={() => null}
        onChangeSettings={() => null}
        onReStart={() => null}
        onStart={() => null}
        settings={initialGameSettings}
        mode={Mode.PAUSE}
      />
    );
    const newBoardSizeX = 80;
    const inputBoardSizeX = getByTestId("inputBoardSizeX");
    expect(inputBoardSizeX).toHaveDisplayValue(`${x}`);
    fireEvent.change(inputBoardSizeX, {
      target: { value: newBoardSizeX },
    });
    expect(inputBoardSizeX).toHaveDisplayValue(`${newBoardSizeX}`);
    fireEvent.click(getByTestId("s-btn-cancel"));
    expect(inputBoardSizeX).toHaveDisplayValue(`${x}`);
  });
});
