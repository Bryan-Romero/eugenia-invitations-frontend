import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { changePasswordAsync, forgotPasswordAsync } from "./userAsync";

interface UserTypes {
  message: string;
  isLoading: boolean;
}

const initialState: UserTypes = {
  message: "",
  isLoading: false,
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(forgotPasswordAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPasswordAsync.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.isLoading = false;
      })
      .addCase(forgotPasswordAsync.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(changePasswordAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changePasswordAsync.fulfilled, (state, action) => {
        state.message = action.payload.message;
        console.log(action.payload.message);
        state.isLoading = false;
      })
      .addCase(changePasswordAsync.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const selectMessage = (state: RootState) => state.user.message;
export const selectIsLoading = (state: RootState) => state.user.isLoading;

export default authSlice.reducer;
