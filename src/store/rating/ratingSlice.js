import { createSlice } from "@reduxjs/toolkit";
import { ratingThunk } from "./thunk/ratingSlice";
const initialState = {
  loading: false,
  error: null,
};
const ratingSlice = createSlice({
  name: "rating",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(ratingThunk.pending, (state) => {
      (state.loading = true), (state.error = null);
    });
    builder.addCase(ratingThunk.fulfilled, (state, action) => {
      state.error = null;
      state.loading = false;
    });
    builder.addCase(ratingThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export default ratingSlice.reducer;
