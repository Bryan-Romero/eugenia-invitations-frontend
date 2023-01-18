import { createSlice } from "@reduxjs/toolkit";
import { getInvitationsService } from "../../services/getInvitationsService";
import {InputsCreateInvitation} from '../../types/InputsTypes'

export interface authState {
  jwt: string | null;
  isLogin: boolean;
  name: string;
  loading: boolean;
  invitations: InputsCreateInvitation[] | null;
}

const initialState: authState = {
  jwt: window.sessionStorage.getItem("jwtAppEugenia"),
  isLogin: false,
  name: "",
  loading: false,
  invitations: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLogin = true;
      state.jwt = action.payload.token;
      state.name = action.payload.user;
      window.sessionStorage.setItem("jwtAppEugenia", action.payload.token);
    },
    logout: (state) => {
      state.isLogin = false;
      state.jwt = "";
      state.name = "";
      state.invitations = null;
      window.sessionStorage.removeItem("jwtAppEugenia");
    },
    verefyToken: (state, action) => {
      state.isLogin = true;
      state.name = action.payload.user;
    },
    invitations: (state, action) => {
      state.invitations = action.payload.invitations;
    },
  },
});

export const { login, logout, verefyToken, invitations } = authSlice.actions;

export default authSlice.reducer;

// window.sessionStorage.getItem("jwtAppEugenia")
// window.sessionStorage.setItem('jwtAppEugenia', token)
// window.sessionStorage.removeItem('jwtAppEugenia')
