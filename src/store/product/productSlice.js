import { createSlice } from "@reduxjs/toolkit";
import { productThunk } from "./thunk/productThunk";
import { productThunkById } from "./thunk/productThunkById";
import { deleteProduct } from "./thunk/deleteProduct";
import { toggleLikeProduct } from "./thunk/toggleLikeProduct";

const initialState = {
  products: [],
  product: {},
  loading: false,
  loadingLike: false,
  error: null,
  savedProducts: [],
  totalPages: 1,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSavedProduct: (state, action) => {
      const productId = action.payload;
      if (!Array.isArray(state.savedProducts)) state.savedProducts = [];
      const idx = state.savedProducts.indexOf(productId);
      if (idx === -1) state.savedProducts.push(productId);
      else state.savedProducts.splice(idx, 1);
    },
    setLikeLocal: (state, action) => {
      const { productId, userId, liked } = action.payload;

      const updateLikes = (likesArray) => {
        let likes = Array.isArray(likesArray) ? [...likesArray] : [];
        if (liked) {
          if (!likes.includes(userId)) likes.push(userId);
        } else {
          likes = likes.filter((id) => id !== userId);
        }
        return likes;
      };

      const productIndex = state.products.findIndex((p) => p._id === productId);
      if (productIndex !== -1) {
        state.products[productIndex].likes = updateLikes(
          state.products[productIndex].likes
        );
      }

      if (state.product._id === productId) {
        state.product.likes = updateLikes(state.product.likes);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(toggleLikeProduct.pending, (state) => {
        state.loadingLike = true;
      })
      .addCase(toggleLikeProduct.fulfilled, (state) => {
        state.loadingLike = false;
      })
      .addCase(toggleLikeProduct.rejected, (state) => {
        state.loadingLike = false;
      });
  },
});

export const { setSavedProduct, setLikeLocal } = productSlice.actions;
export default productSlice.reducer;
