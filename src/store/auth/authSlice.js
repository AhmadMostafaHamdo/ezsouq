import { createSlice } from "@reduxjs/toolkit";
import { thunkAuth } from "./thunk/authThunk";
const initialState = {
  user: {},
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
    });
    builder.addCase(thunkAuth.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export default authSlice.reducer;
