import { createSlice } from "@reduxjs/toolkit";
import { thunkAuth } from "./thunk/authThunk";
import Cookies from "js-cookie";
import { logout } from "./thunk/logout";

const initialState = {
  user: {}, // User data
  token: Cookies.get("token") || null, // Token from cookies if exists
  loading: false, // Loading state
  error: null, // Error message
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Set current user and token
    setCurrentUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      Cookies.set("token", action.payload.token, { expires: 7 });
    },
    resetLoading: (state) => {
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    // Handle login/register pending
    builder.addCase(thunkAuth.pending, (state) => {
      state.loading = true;
    });
    // Handle login/register success
    builder.addCase(thunkAuth.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.token = action.payload.token;
      Cookies.set("token", action.payload.token, { expires: 7 });
    });
    // Handle login/register failure
    builder.addCase(thunkAuth.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // Handle logout pending
    builder.addCase(logout.pending, (state) => {
      state.loading = true; // Set loading only during API call
    });
    // Handle logout success
    builder.addCase(logout.fulfilled, (state) => {
      state.loading = false;
      state.token = null;
      state.user = {}; // Clear user data
    });
    // Handle logout failure
    builder.addCase(logout.rejected, (state) => {
      state.loading = false;
      state.token = null;
      state.user = {}; // Clear user data even if logout fails
    });
  },
});

export const { setCurrentUser, resetLoading } = authSlice.actions;
export default authSlice.reducer;
