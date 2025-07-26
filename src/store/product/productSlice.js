// src/store/product/productSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { productThunk } from "./thunk/productThunk";
import { productThunkById } from "./thunk/productThunkById";
import { getAllLikesThunk } from "./thunk/getAllLikesThunk";

const initialState = {
  products: [], // قائمة المنتجات
  product: {}, // منتج مفصل حالياً (مثلاً صفحة تفاصيل)
  likes: [],
  loading: false,
  error: null,
  savedProducts: [],
  totalPages: 1,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setLike: (state, action) => {
      const { productId, liked, userId } = action.payload;
      const idx = state.products.findIndex((p) => p._id === productId);

      if (idx !== -1) {
        let currentLikes = Array.isArray(state.products[idx].likes)
          ? [...state.products[idx].likes]
          : [];

        if (liked) {
          if (!currentLikes.includes(userId)) currentLikes.push(userId);
        } else {
          currentLikes = currentLikes.filter((id) => id !== userId);
        }

        state.products[idx].likes = currentLikes;
      }

      if (state.product._id === productId) {
        let currentLikes = Array.isArray(state.product.likes)
          ? [...state.product.likes]
          : [];

        if (liked) {
          if (!currentLikes.includes(userId)) currentLikes.push(userId);
        } else {
          currentLikes = currentLikes.filter((id) => id !== userId);
        }

        state.product.likes = currentLikes;
      }
    },
    setSavedProduct: (state, action) => {
      const productId = action.payload;
      if (!Array.isArray(state.savedProducts)) {
        state.savedProducts = [];
      }
      const index = state.savedProducts.indexOf(productId);
      if (index === -1) {
        state.savedProducts.push(productId);
      } else {
        state.savedProducts.splice(index, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(productThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(productThunk.fulfilled, (state, action) => {
        state.loading = false;
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
      })
      .addCase(getAllLikesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.likes = action.payload;
      });
  },
});

export const { setLike, setSavedProduct } = productSlice.actions;
export default productSlice.reducer;
