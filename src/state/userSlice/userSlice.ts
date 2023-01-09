import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  name: string;
}

export const initialState: UserState = {
  name: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    login: (_state, _action: PayloadAction<string>) => void 0,
    logout: () => void 0,
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
