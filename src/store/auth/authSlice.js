import { createSlice } from "@reduxjs/toolkit";
import { thunkAuth } from "./thunk/authThunk";
import Cookies from "js-cookie";
import { logout } from "./thunk/logout";

const initialState = {
  user: {},
  token: Cookies.get("token") || null,
  loading: false,
  error: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(thunkAuth.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(thunkAuth.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.token = action.payload.token;
      Cookies.set("token", action.payload.token);
    });
    builder.addCase(thunkAuth.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.token = null;
      state.user = {};
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.token = null;
      state.user = {};
    });
  },
});
export default authSlice.reducer;
