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
  reducers: {},
  extraReducers: (builder) =>
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
      }),
});
export default wishlistSlice.reducer;
