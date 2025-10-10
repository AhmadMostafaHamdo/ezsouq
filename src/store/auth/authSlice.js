import { createSlice } from "@reduxjs/toolkit";
import { thunkAuth } from "./thunk/authThunk";
import Cookies from "js-cookie";
import { logout } from "./thunk/logout";

const initialState = {
  user: {}, // User data
  token: Cookies.get("token") || null, // JWT token from cookies if exists
  loading: false, // Loading state
  error: null, // Error message
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Update current user directly (for Google login)
    setCurrentUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      Cookies.set("token", action.payload.token, { expires: 7 }); // Save token for 7 days
    },
  },
  extraReducers: (builder) => {
    builder.addCase(thunkAuth.pending, (state) => {
      state.loading = true; // Set loading true while API call
    });
    builder.addCase(thunkAuth.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload; // Set user from API response
      state.token = action.payload.token; // Set token
      Cookies.set("token", action.payload.token); // Save token in cookies
    });
    builder.addCase(thunkAuth.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload; // Save error message
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.token = null;
      state.user = {}; // Clear user data on logout
    });
    builder.addCase(logout.rejected, (state) => {
      state.token = null;
      state.user = {}; // Clear user data even if logout fails
    });
  },
});

export const { setCurrentUser } = authSlice.actions;
export default authSlice.reducer;
