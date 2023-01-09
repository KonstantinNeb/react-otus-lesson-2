import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import FormLogin from "./components/FormLogin/FormLogin";
import { ROUTE } from "./constants";
import { Provider } from "react-redux";
import { store } from "./state/store";
import Game from "./components/Game/Game";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path={ROUTE.ROOT} element={<Game />} />
        <Route path={ROUTE.AUTH} element={<FormLogin />} />
        <Route path={ROUTE.OTHER} element={<Navigate to={ROUTE.ROOT} />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
