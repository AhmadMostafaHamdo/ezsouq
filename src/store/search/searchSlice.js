import { createSlice } from "@reduxjs/toolkit";
import { searchThunk } from "./thunk/serachThunk";
const initialState = {
  loading: false,
  error: null,
  searchedProducts: [],
};
const searchedProductsSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(searchThunk.pending, (state) => {
      (state.loading = true), (state.error = null);
    });
    builder.addCase(searchThunk.fulfilled, (state, action) => {
      state.error = null;
      state.loading = false;
      state.searchedProducts = action.payload;
    });
    builder.addCase(searchThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export default searchedProductsSlice.reducer;
