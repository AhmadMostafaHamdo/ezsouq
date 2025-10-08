import { createSlice } from "@reduxjs/toolkit";
import { getAllWishes } from "./thunk/getAllWishProduct";

const initialState = {
  loading: false,
  products: [],
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    removeWishLocal: (state, action) => {
      const productId = action.payload;
      state.products = state.products.filter((p) => p._id !== productId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllWishes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllWishes.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getAllWishes.rejected, (state) => {
        state.loading = false;
        state.error = null;
      });
  },
});

export const { removeWishLocal } = wishlistSlice.actions;
export default wishlistSlice.reducer;
