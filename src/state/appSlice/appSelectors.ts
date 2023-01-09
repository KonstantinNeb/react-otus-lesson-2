import { RootState } from "../store";
import { AppState } from "./appSlice";

export const selectAppState = (state: RootState): AppState => state.app;
