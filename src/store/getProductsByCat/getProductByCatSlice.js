import { createSlice } from "@reduxjs/toolkit";
import { thunkGetProductByCat } from "./thunk/thunkGetProductByCat";

const initialState = {
  products: [],
  loading: false,
  error: null,
  totalPages: 1,
  currentPage: 1,
};

const productByCatSlice = createSlice({
  name: "productsByCat",
  initialState,
  reducers: {
    // ✅ Reset عند تغيير الكاتيجوري
    resetProducts: (state) => {
      state.products = [];
      state.loading = false;
      state.error = null;
      state.totalPages = 1;
      state.currentPage = 1;
    },

    // ✅ تحديث اللايكات محلياً
    setLikeLocalByCat: (state, action) => {
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(thunkGetProductByCat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(thunkGetProductByCat.fulfilled, (state, action) => {
        state.loading = false;

        // ✅ إذا الصفحة الأولى → استبدل
        // ✅ إذا الصفحة أكبر من 1 → أضف فوق القديمة (concat)
        if (action.payload.currentPage === 1) {
          state.products = action.payload.items;
        } else {
          state.products = [...state.products, ...action.payload.items];
        }

        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(thunkGetProductByCat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ✅ Export actions
export const { setLikeLocalByCat, resetProducts } = productByCatSlice.actions;

// ✅ Export reducer
export default productByCatSlice.reducer;
