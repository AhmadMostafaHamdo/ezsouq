  import { createSlice } from "@reduxjs/toolkit";
  import { productThunk } from "./thunk/productThunk";
  import { productThunkById } from "./thunk/productThunkById";
  import { toggleLikeProduct } from "./thunk/toggleLikeProduct";
  import { productsThunkForMe } from "./thunk/productsThunkById";

  const initialState = {
    products: [], // Current page products
    product: {}, // Single product detail
    productsById: [], // Products by user (profile)
    loading: false,
    loadingLike: false,
    error: null,
    savedProductsByUser: {},
    totalPages: 1,
    currentPage: 1,
    totalItems: 0,
  };

  const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
      // Clear all products and single product
      clearAllProducts: (state) => {
        state.products = [];
        state.product = {};
      },

      // Toggle saved product for a user
      setSavedProduct: (state, action) => {
        const { userId, productId } = action.payload;
        if (!userId) return;

        if (!state.savedProductsByUser[userId])
          state.savedProductsByUser[userId] = [];

        const idx = state.savedProductsByUser[userId].indexOf(productId);
        if (idx === -1) state.savedProductsByUser[userId].push(productId);
        else state.savedProductsByUser[userId].splice(idx, 1);
      },

      // Update local like/unlike without refetching
      setLikeLocal: (state, action) => {
        const { productId, userId, liked } = action.payload;

        const updateLikes = (likesArray) => {
          let likes = Array.isArray(likesArray) ? [...likesArray] : [];
          if (liked && !likes.includes(userId)) likes.push(userId);
          if (!liked) likes = likes.filter((id) => id !== userId);
          return likes;
        };

        // Update products list
        const idx = state.products.findIndex((p) => p._id === productId);
        if (idx !== -1)
          state.products[idx].likes = updateLikes(state.products[idx].likes);

        // Update product detail
        if (state.product._id === productId)
          state.product.likes = updateLikes(state.product.likes);

        // Update profile products
        const idxById = state.productsById.findIndex((p) => p._id === productId);
        if (idxById !== -1)
          state.productsById[idxById].likes = updateLikes(
            state.productsById[idxById].likes
          );
      },
    },
    extraReducers: (builder) => {
      builder
        // Fetch paginated products
        .addCase(productThunk.pending, (state) => {
          state.loading = true;
        })
        .addCase(productThunk.fulfilled, (state, action) => {
          state.loading = false;
          state.totalItems = action.payload.totalItems;
          state.totalPages = action.payload.totalPages;
          state.currentPage = action.payload.currentPage;
          // ✅ Use `items` from API for current page
          state.products = action.payload.products;
        })
        .addCase(productThunk.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })

        // Fetch single product by ID
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

        // Toggle like/unlike
        .addCase(toggleLikeProduct.pending, (state) => {
          state.loadingLike = true;
        })
        .addCase(toggleLikeProduct.fulfilled, (state) => {
          state.loadingLike = false;
        })
        .addCase(toggleLikeProduct.rejected, (state) => {
          state.loadingLike = false;
        })

        // Fetch products by user (profile)
        .addCase(productsThunkForMe.pending, (state) => {
          state.loading = true;
        })
        .addCase(productsThunkForMe.fulfilled, (state, action) => {
          state.loading = false;
          state.productsById = action.payload;
        })
        .addCase(productsThunkForMe.rejected, (state) => {
          state.loading = false;
        });
    },
  });

  export const { setSavedProduct, setLikeLocal, clearAllProducts } =
    productSlice.actions;
  export default productSlice.reducer;
