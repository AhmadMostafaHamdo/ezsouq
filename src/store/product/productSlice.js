import { createSlice } from "@reduxjs/toolkit";
import { productThunk } from "./thunk/productThunk";
import { productThunkById } from "./thunk/productThunkById";
import { deleteProduct } from "./thunk/deleteProduct";
import { toggleLikeProduct } from "./thunk/toggleLikeProduct";
import { productsThunkById } from "./thunk/productsThunkById";

const initialState = {
  products: [],
  product: {},
  productsById:[],
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
    clearAllProducts: (state) => {
      state.products = [];
      state.product = {};
    },
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
      .addCase(productThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(productThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;

        if (action.payload.currentPage === 1) {
          // الصفحة الأولى → استبدال البيانات
          state.products = action.payload.products;
        } else {
          // صفحات إضافية → دمج مع الموجود
          state.products = [...state.products, ...action.payload.products];
        }
      })
      .addCase(productThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(productThunkById.pending, (state) => {
        state.loading = true;
      })
      .addCase(productThunkById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(productThunkById.rejected, (state) => {
        state.loading = false;
      })
      .addCase(toggleLikeProduct.pending, (state) => {
        state.loadingLike = true;
      })
      .addCase(toggleLikeProduct.fulfilled, (state) => {
        state.loadingLike = false;
      })
      .addCase(toggleLikeProduct.rejected, (state) => {
        state.loadingLike = false;
      })
      .addCase(productsThunkById.pending, (state) => {
        state.loading=trye;
      })
      .addCase(productsThunkById.fulfilled, (state,action)=> {
        state.loading = false;
        state.productsById=action.payload
      })
      .addCase(productsThunkById.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setSavedProduct, setLikeLocal, clearAllProducts } =
  productSlice.actions;
export default productSlice.reducer;
