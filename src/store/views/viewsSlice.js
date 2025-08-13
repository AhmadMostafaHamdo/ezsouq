import { createSlice } from "@reduxjs/toolkit";
import { viewsThunk } from "./thunk/thunkViews";

const initialState = {
  views: [],
  loading: false,
  error: null,
};
const viewsSlice = createSlice({
  name: "views",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(viewsThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(viewsThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.views = action.payload;
    });
    builder.addCase(viewsThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export default viewsSlice.reducer;
