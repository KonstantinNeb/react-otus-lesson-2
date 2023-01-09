import { RootState } from "../store";
import { UserState } from "./userSlice";

export const selectUserState = (state: RootState): UserState => state.user;
export const selectIsLogined = (state: RootState): boolean =>
  state.user && state.user.name !== "";
