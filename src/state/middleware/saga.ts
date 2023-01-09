import { takeEvery } from "redux-saga/effects";
import { appActions } from "../appSlice/appSlice";
import { userActions } from "../userSlice/userSlice";
import { onLogin, onLogout } from "./authUser/authUser";
import { playGame } from "./playGame/playGame";

export default function* rootSaga() {
  yield takeEvery(userActions.login.type, onLogin);
  yield takeEvery(userActions.logout.type, onLogout);
  yield takeEvery(appActions.start.type, playGame);
}
