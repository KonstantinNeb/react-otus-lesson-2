import { useEffect } from "react";
import { loadLocalAppState } from "../localStorage";
import { useAppActions } from "./useActions";

export const useLocalAppState = () => {
  const { setSettings, initCellsData, pause } = useAppActions();
  useEffect(() => {
    const localAppState = loadLocalAppState();
    if (localAppState) {
      setSettings(localAppState.settings);
      initCellsData(localAppState.cellsData);
      pause();
    }
  }, []);
};
