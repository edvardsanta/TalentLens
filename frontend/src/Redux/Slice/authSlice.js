// @ts-check
import { createSlice } from "@reduxjs/toolkit";
import { loginUser, logoutUser } from "../thunks/authThunks";

/** @type {import('../../types/auth.types').AuthState} */
const initialState = {
  auth: JSON.parse(localStorage.getItem("user")) || null,
  isLoggedIn: !!localStorage.getItem("user"),
  isLoading: false,
  error: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState(state) {
      state.error = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.auth = action.payload;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload || null;
        state.auth = null;
        state.isLoggedIn = false;
        state.isLoading = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.auth = null;
        state.isLoggedIn = false;
        state.error = null;
        state.isLoading = false;
      });
  },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
