import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiInvitations } from "../../types/ApiRespondTypes";

interface InvitationsTypes extends ApiInvitations {
  isLoading: boolean;
}

const initialState: InvitationsTypes = {
  invitations: [],
  isLoading: false,
};

export const invitationSlice = createSlice({
  name: "invitation",
  initialState,
  reducers: {
    invitations: (state, { payload }: PayloadAction<ApiInvitations>) => {
      state.invitations = payload.invitations;
    },
    loadingInvitationsTrue: (state) => {
      state.isLoading = true;
    },
    loadingInvitationsFalse: (state) => {
      state.isLoading = false;
    },
  },
});

export const { invitations, loadingInvitationsTrue, loadingInvitationsFalse } =
  invitationSlice.actions;

export default invitationSlice.reducer;

// window.sessionStorage.getItem("jwtAppEugenia")
// window.sessionStorage.setItem('jwtAppEugenia', token)
// window.sessionStorage.removeItem('jwtAppEugenia')
