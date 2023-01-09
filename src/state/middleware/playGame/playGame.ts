import { fork, take, cancel, select, put, delay } from "redux-saga/effects";
import { Task } from "redux-saga";
import { appActions, AppState } from "../../appSlice/appSlice";
import { selectAppState } from "../../appSlice/appSelectors";
import { speedToMs } from "../../../utils";
import { userActions } from "../../userSlice/userSlice";

function* gameLoop() {
  while (true) {
    const app: AppState = yield select(selectAppState);
    yield put(appActions.generateCellSData());
    yield delay(speedToMs(app.settings.speed));
  }
}

export function* playGame() {
  const task: Task = yield fork(gameLoop);
  yield take([
    appActions.pause.type,
    appActions.reStart.type,
    userActions.logout.type,
  ]);
  yield cancel(task);
}
