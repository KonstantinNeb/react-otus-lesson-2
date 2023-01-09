import { AppState } from "./state/appSlice/appSlice";

export const enum LocalStorage {
  LOGIN_KEY = "login",
  APP_STATE_KEY = "app_state",
}

export const saveLocalLogin = (login: string) => {
  localStorage.setItem(LocalStorage.LOGIN_KEY, login);
};

export const loadLocalLogin = (): string => {
  const name = localStorage.getItem(LocalStorage.LOGIN_KEY);
  return name || "";
};

export const saveLocalAppState = (appState: AppState) => {
  localStorage.setItem(LocalStorage.APP_STATE_KEY, JSON.stringify(appState));
};

export const loadLocalAppState = (): AppState => {
  const appState = localStorage.getItem(LocalStorage.APP_STATE_KEY);
  return appState ? JSON.parse(appState) : null;
};

export const removeLocalAppState = () => {
  localStorage.removeItem(LocalStorage.APP_STATE_KEY);
};
