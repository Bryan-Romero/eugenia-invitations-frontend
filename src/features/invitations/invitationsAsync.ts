import { createAsyncThunk } from "@reduxjs/toolkit";
import { InputsCreateInvitation } from "../../types/InputsTypes";
import { UseFormSetError } from "react-hook-form/dist/types";
import { createInvitationService } from "../../services/createInvitationService";
import { Inputs as InputsCI } from "../../pages/CreateInvitation";
import { deleteInvitationService } from "../../services/deleteInvitationService";
import { getInvitationsByIdService } from "../../services/getInvitationsByIdService";
import { getInvitationsService } from "../../services/getInvitationsService";

export const createInvitationAsync = createAsyncThunk(
  "invitations/fetchCreateInvitation",
  async (
    dataUser: {
      token: string;
      data: InputsCreateInvitation;
      setError: UseFormSetError<InputsCI>;
    },
    { rejectWithValue }
  ) => {
    const { token, data, setError } = dataUser;
    try {
      return await createInvitationService(token, data);
    } catch (error: any) {
      setError("error", { message: error });
      return rejectWithValue(error);
    }
  }
);

export const deleteInvitationAsync = createAsyncThunk(
  "invitations/fetchDeleteInvitation",
  async (
    dataUser: {
      token: string;
      id: string;
    },
    { rejectWithValue }
  ) => {
    const { token, id } = dataUser;
    try {
      return await deleteInvitationService(token, id);
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const getInvitationByIdAsync = createAsyncThunk(
  "invitations/fetchGetInvitationById",
  async (
    dataUser: {
      tokenToShare: string;
    },
    { rejectWithValue }
  ) => {
    const { tokenToShare } = dataUser;
    try {
      return await getInvitationsByIdService(tokenToShare);
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const getInvitationsAsync = createAsyncThunk(
  "invitations/fetchGetInvitations",
  async (
    dataUser: {
      token: string;
    },
    { rejectWithValue }
  ) => {
    const { token } = dataUser;
    try {
      return await getInvitationsService(token);
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
