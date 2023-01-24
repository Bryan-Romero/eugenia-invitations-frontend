import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  InputsChangePassword,
  InputsForgotPassword,
} from "../../types/InputsTypes";
import { UseFormSetError } from "react-hook-form/dist/types";
import { forgotPasswordService } from "../../services/forgotPasswordService";
import { Inputs as InputsFP } from "../../pages/ForgotPassword";
import { changePasswordService } from "../../services/changePasswordService";
import { Inputs as InputsCP } from "../../pages/ChangePassword";

export const forgotPasswordAsync = createAsyncThunk(
  "user/fetchForgotPassword",
  async (
    dataUser: {
      data: InputsForgotPassword;
      setError: UseFormSetError<InputsFP>;
    },
    { rejectWithValue }
  ) => {
    const { data, setError } = dataUser;
    try {
      return await forgotPasswordService(data);
    } catch (error: any) {
      if (error.email) {
        setError("email", { message: error.email }, { shouldFocus: true });
      } else {
        setError("error", { message: error });
      }
      return rejectWithValue(error);
    }
  }
);

export const changePasswordAsync = createAsyncThunk(
  "user/fetchChangePassword",
  async (
    dataUser: {
      token: string;
      data: InputsChangePassword;
      setError: UseFormSetError<InputsCP>;
    },
    { rejectWithValue }
  ) => {
    const { token, data, setError } = dataUser;
    try {
      return await changePasswordService(token, data);
    } catch (error: any) {
      if (error.email) {
        setError("error", { message: error.email });
      } else {
        setError("error", { message: error });
      }
      return rejectWithValue(error);
    }
  }
);
