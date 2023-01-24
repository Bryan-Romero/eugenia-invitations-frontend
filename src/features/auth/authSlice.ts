import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { ApiLogin } from "../../types/ApiRespondTypes";
import { createUserAsync, loginAsync } from "./authAsync";

interface AuthTypes extends ApiLogin {
  isLogin: boolean;
  isLoading: boolean;
}

const initialState: AuthTypes = {
  token: "",
  user: "",
  createAt: "",
  isLogin: false,
  isLoading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<ApiLogin>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.createAt = action.payload.createAt;
    },
    logout: (state) => {
      state.isLogin = false;
      state.token = "";
      state.user = "";
      state.createAt = "";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        authSlice.caseReducers.login(state, action);
        state.isLogin = true;
        state.isLoading = false;
      })
      .addCase(loginAsync.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(createUserAsync.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        authSlice.caseReducers.login(state, action);
        state.isLogin = true;
        state.isLoading = false;
      })
      .addCase(createUserAsync.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
export const { logout } = authSlice.actions;

export const selectToken = (state: RootState) => state.auth.authReducer.token;
export const selectUser = (state: RootState) => state.auth.authReducer.user;
export const selectIsLogin = (state: RootState) =>
  state.auth.authReducer.isLogin;
export const selectIsLoading = (state: RootState) =>
  state.auth.authReducer.isLoading;

export default authSlice.reducer;
