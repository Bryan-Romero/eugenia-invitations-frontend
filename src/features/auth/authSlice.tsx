import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

export interface authState {
  jwt: string | null;
  isLogin: boolean;
}

const initialState: authState = {
  jwt: window.sessionStorage.getItem("jwt"),
  isLogin: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: () => console.log("login"),
    logout: () => console.log("logout"),
  },
});

export const { login, logout  } = authSlice.actions

export default authSlice.reducer;
