import { createSlice } from "@reduxjs/toolkit";
import { productThunk } from "./thunk/productThunk";

const initialState = {
  products: [],
  loading: false,
  error: null,
};
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(productThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(productThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(productThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export default productSlice.reducer;
