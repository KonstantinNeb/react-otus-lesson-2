import { userActions } from "../../userSlice/userSlice";
import { put } from "redux-saga/effects";

type ActionLogin = { type: typeof userActions.login.type; payload: string };

export function* onLogin(action: ActionLogin) {
  const name = action.payload;
  yield put(userActions.setUser(name));
}

export function* onLogout() {
  yield put(userActions.setUser(""));
}
