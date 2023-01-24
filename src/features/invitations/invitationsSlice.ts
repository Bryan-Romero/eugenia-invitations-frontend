import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { ApiInvitations } from "../../types/ApiRespondTypes";
import { InputsCreateInvitation } from "../../types/InputsTypes";
import {
  createInvitationAsync,
  deleteInvitationAsync,
  getInvitationByIdAsync,
  getInvitationsAsync,
} from "./invitationsAsync";

interface InvitationsTypes extends ApiInvitations {
  tokenToShare: string;
  isLoading: boolean;
  invitationDetail: InputsCreateInvitation;
}

const initialState: InvitationsTypes = {
  invitations: [],
  tokenToShare: "",
  message: "",
  isLoading: false,
  invitationDetail: {
    id: "",
    guestName: "",
    dateOfEntry: "",
    expirationDate: "",
    tokenShare: "",
  },
};

export const invitationSlice = createSlice({
  name: "invitation",
  initialState,
  reducers: {
    resetMessageSuccess: (state) => {
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createInvitationAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createInvitationAsync.fulfilled, (state, action) => {
        state.invitations = action.payload.invitations;
        state.tokenToShare = action.payload.token;
        state.message = action.payload.message;
        state.isLoading = false;
      })
      .addCase(createInvitationAsync.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(deleteInvitationAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteInvitationAsync.fulfilled, (state, action) => {
        state.invitations = action.payload.invitations;
        state.isLoading = false;
      })
      .addCase(deleteInvitationAsync.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(getInvitationByIdAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInvitationByIdAsync.fulfilled, (state, action) => {
        state.invitationDetail = action.payload.invitation;
        state.message = action.payload.message;
        state.isLoading = false;
      })
      .addCase(getInvitationByIdAsync.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(getInvitationsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInvitationsAsync.fulfilled, (state, action) => {
        state.invitations = action.payload.invitations;
        state.isLoading = false;
      })
      .addCase(getInvitationsAsync.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { resetMessageSuccess } = invitationSlice.actions;

export const selectInvitations = (state: RootState) =>
  state.invitations.invitations;
export const selectTokenToShare = (state: RootState) =>
  state.invitations.tokenToShare;
export const selectIsLoading = (state: RootState) =>
  state.invitations.isLoading;
export const selectInvitationDetail = (state: RootState) =>
  state.invitations.invitationDetail;
export const selectMessageSuccess = (state: RootState) =>
  state.invitations.message;

export default invitationSlice.reducer;
