import { createSlice } from "@reduxjs/toolkit";
import { thunkGetProductByCat } from "./thunk/thunkGetProductByCat";

const initialState = {
  products: [],
  loading: false,
  error: null,
  totalPages: 1, // التصحيح: قيمة افتراضية
};

const productByCatSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(thunkGetProductByCat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(thunkGetProductByCat.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(thunkGetProductByCat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productByCatSlice.reducer;
