import { createSlice } from "@reduxjs/toolkit";
import { productThunk } from "./thunk/productThunk";
import { productThunkById } from "./thunk/productThunkById";

const initialState = {
  products: [],
  product:[],
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
      state.products = action.payload.items;
    });
    builder.addCase(productThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
     builder.addCase(productThunkById.pending, (state) => {
       state.loading = true;
       state.error = null;
     });
     builder.addCase(productThunkById.fulfilled, (state, action) => {
       state.loading = false;
       state.product = action.payload.items; 
     });
     builder.addCase(productThunkById.rejected, (state, action) => {
       state.loading = false;
       state.error = action.payload;
     });
  },
});
export default productSlice.reducer;
