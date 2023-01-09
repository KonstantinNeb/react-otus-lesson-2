import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice/appSlice";
import userSlice from "./userSlice/userSlice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./middleware/saga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    app: appSlice,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
