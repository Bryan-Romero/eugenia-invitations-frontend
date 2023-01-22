import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiLogin } from "../../types/ApiRespondTypes";

interface AuthTypes extends ApiLogin {
  isLogin: boolean;
}

const initialState: AuthTypes = {
  token: "",
  user: "",
  isLogin: false,
  createAt: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }: PayloadAction<ApiLogin>) => {
      state.isLogin = true;
      state.token = payload.token;
      state.user = payload.user;
      state.createAt = payload.createAt;
    },
    logout: (state) => {
      state.isLogin = false;
      state.token = "";
      state.user = "";
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
