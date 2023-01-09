import { expectSaga } from "redux-saga-test-plan";
import reducer, { userActions } from "../../userSlice/userSlice";
import { onLogin, onLogout } from "./authUser";

describe("authUser", () => {
  it("onLogin", () => {
    const mockLogin = "login";
    return expectSaga(onLogin, {
      type: userActions.login.type,
      payload: mockLogin,
    })
      .withReducer(reducer)
      .hasFinalState({ name: mockLogin })
      .run();
  });

  it("onLogout", () => {
    return expectSaga(onLogout)
      .withReducer(reducer)
      .hasFinalState({ name: "" })
      .run();
  });
});
