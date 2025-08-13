import { createSlice } from "@reduxjs/toolkit";
import { ratingThunk } from "./thunk/ratingThunk";
import { getRatingThunk } from "./thunk/getRatingThunk";
const initialState = {
  loading: false,
  error: null,
  rating: 0,
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
    builder.addCase(getRatingThunk.pending, (state) => {
      (state.loading = true), (state.error = null);
    });
    builder.addCase(getRatingThunk.fulfilled, (state, action) => {
      state.error = null;
      state.loading = false;
      state.rating = action.payload;
    });
    builder.addCase(getRatingThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export default ratingSlice.reducer;
