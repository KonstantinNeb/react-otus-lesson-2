import { render, cleanup, fireEvent } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ROUTE } from "../../constants";
import FormLogin from "./FormLogin";
import { store } from "../../state/store";
import { userActions } from "../../state/userSlice/userSlice";

afterEach(cleanup);

const mockUserName = "UserName";

describe("FormLogin", () => {
  it("render", () => {
    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[ROUTE.AUTH]}>
          <Routes>
            <Route path={ROUTE.AUTH} element={<FormLogin />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(getByText("Welcome to «Game of life»")).toBeInTheDocument();
    const inputUserName = getByTestId("inputUserName");
    expect(inputUserName).toBeInTheDocument();
    expect(inputUserName).toHaveValue("");
    expect(inputUserName).toHaveAttribute("placeholder", "Input your name");
    expect(getByTestId("l-btn-login")).toBeInTheDocument();
    expect(getByTestId("l-btn-login")).toHaveTextContent(/Click to start Game/);
  });

  it("Enter username in textbox and click the Start button", () => {
    jest.spyOn(userActions, "setUser");
    const { getByTestId, queryByTestId } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[ROUTE.AUTH]}>
          <Routes>
            <Route path={ROUTE.ROOT} element={<FormLogin />} />
            <Route path={ROUTE.AUTH} element={<FormLogin />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const inputUserName = getByTestId("inputUserName");
    fireEvent.change(inputUserName, { target: { value: mockUserName } });

    expect(inputUserName).toHaveValue(mockUserName);
    fireEvent.click(getByTestId("l-btn-login"));
    expect(userActions.setUser).toBeCalledTimes(3);
    expect(userActions.setUser).toBeCalledWith(mockUserName);
    expect(queryByTestId("inputUserName")).toHaveValue("");
  });
});
