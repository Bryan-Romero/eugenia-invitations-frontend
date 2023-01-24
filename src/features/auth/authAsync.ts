import { createAsyncThunk } from "@reduxjs/toolkit";
import { InputsCreateAccount, InputsLogin } from "../../types/InputsTypes";
import { UseFormSetError } from "react-hook-form/dist/types";
import { Inputs as InputsL } from "../../pages/Login";
import { loginService } from "../../services/loginService";
import { Inputs as InputsCU } from "../../pages/CreateUser";
import { createUserService } from "../../services/createUserService";

export const loginAsync = createAsyncThunk(
  "auth/fetchLogin",
  async (
    dataUser: { data: InputsLogin; setError: UseFormSetError<InputsL> },
    { rejectWithValue }
  ) => {
    const { data, setError } = dataUser;
    try {
      return await loginService(data);
    } catch (error: any) {
      if (error.email) {
        setError("email", { message: error.email }, { shouldFocus: true });
      } else if (error.password) {
        setError(
          "password",
          { message: error.password },
          { shouldFocus: true }
        );
      } else {
        setError("error", { message: error });
      }
      return rejectWithValue(error);
    }
  }
);

export const createUserAsync = createAsyncThunk(
  "user/fetchCreateUser",
  async (
    dataUser: {
      data: InputsCreateAccount;
      setError: UseFormSetError<InputsCU>;
    },
    { rejectWithValue }
  ) => {
    const { data, setError } = dataUser;
    try {
      return await createUserService(data);
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
