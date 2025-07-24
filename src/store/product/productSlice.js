// src/store/product/productSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { productThunk } from "./thunk/productThunk";
import { productThunkById } from "./thunk/productThunkById";

const initialState = {
  products: [], // قائمة المنتجات
  product: {}, // منتج مفصل حالياً (مثلاً صفحة تفاصيل)
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
      const likedData = action.payload;
      // يفترض أن الرد يحتوي على productId و liked و totalLikes
      const idx = state.products.findIndex(
        (p) => p._id === likedData.productId
      );
      if (idx !== -1) {
        state.products[idx].likes = likedData;
      }
      // إذا المنتج الحالي هو نفسه
      if (state.product._id === likedData.productId) {
        state.product.likes = likedData;
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
      });
  },
});

export const { setLike, setSavedProduct } = productSlice.actions;
export default productSlice.reducer;
