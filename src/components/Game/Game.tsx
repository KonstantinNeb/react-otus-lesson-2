import React, { useCallback } from "react";
import { Button } from "../../elements/Button/Button";
import { FlexBox } from "../../elements/FlexBox";
import { Header } from "../../elements/Header";
import { useAppActions, useUserActions } from "../../hooks/useActions";
import { useCellsData } from "../../hooks/useCellsData";
import { useLocalAppState } from "../../hooks/useLocalAppState";
import { useLogin } from "../../hooks/useLogin";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { saveLocalLogin } from "../../localStorage";
import { selectAppState } from "../../state/appSlice/appSelectors";
import { selectUserState } from "../../state/userSlice/userSelectors";
import { GameSettings } from "../../types";
import Board from "../Board/Board";
import Settings from "../Settings/Settings";

const App = () => {
  const { setSettings, start, pause, reStart, changeCellsData } =
    useAppActions();
  const { settings, cellsData, mode } = useTypedSelector(selectAppState);
  const { name } = useTypedSelector(selectUserState);
  const { logout } = useUserActions();
  const { isLogined } = useLogin();

  useLocalAppState();
  useCellsData();

  const onStart = () => start();
  const onPause = () => pause();
  const onReStart = () => reStart(settings);

  const onLogout = () => {
    logout();
    saveLocalLogin("");
  };

  const onChangeSettings = useCallback(
    (settings: GameSettings) => setSettings(settings),
    [setSettings]
  );

  if (!isLogined) return null;

  return (
    <FlexBox alignItems="center" flexDirection="vertical">
      <Header>«Game of life»</Header>
      <FlexBox gap="1rem">
        <FlexBox alignItems="center" flexDirection="vertical">
          <FlexBox flexDirection="vertical" width="100%">
            <label data-testid="greetingsUser" style={{ fontSize: "20px" }}>
              Hello, {name}!
            </label>
            <Button
              onClick={onLogout}
              mode="secondary"
              data-testid="l-btn-logout"
            >
              Logout
            </Button>
          </FlexBox>
        </FlexBox>
        <FlexBox gap="1rem">
          <Board
            cellsData={cellsData}
            onCellClick={changeCellsData}
            boardSize={settings.boardSize}
          />
        </FlexBox>

        <FlexBox gap="1rem">
          <Settings
            mode={mode}
            settings={settings}
            onPause={onPause}
            onStart={onStart}
            onReStart={onReStart}
            onChangeSettings={onChangeSettings}
          />
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};

export default App;
