import { createSlice } from "@reduxjs/toolkit";
import { productThunk } from "./thunk/productThunk";
import { productThunkById } from "./thunk/productThunkById";

const initialState = {
  products: [],
  product: [],
  loading: false,
  error: null,
  totalPages: 1, // التصحيح: قيمة افتراضية
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(productThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(productThunk.fulfilled, (state, action) => {
        state.loading = false;

        // التصحيح: معالجة البيانات بشكل صحيح
        state.products =
          action.payload.currentPage === 1
            ? action.payload.products
            : [...state.products, ...action.payload.products];

        state.totalPages = action.payload.totalPages;
      })
      .addCase(productThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(productThunkById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(productThunkById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(productThunkById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
