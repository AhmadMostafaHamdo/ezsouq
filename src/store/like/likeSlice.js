// ✅ likeSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { toggleLikeThunk } from "./thunk/toggleLikeThunk";
import { getAllLikes } from "./thunk/getAllLikes";

const initialState = {
  likes: {}, // هيكل: { productId: { totalLikes, liked, loading: false } }
  error: null,
};

const likeSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllLikes.pending, (state, action) => {
        const productId = action.meta.arg;
        if (!state.likes[productId]) {
          state.likes[productId] = {
            totalLikes: 0,
            liked: false,
            loading: true,
          };
        } else {
          state.likes[productId].loading = true;
        }
        state.error = null;
      })
      .addCase(getAllLikes.fulfilled, (state, action) => {
        const { productId, totalLikes, liked } = action.payload;
        state.likes[productId] = {
          totalLikes,
          liked,
          loading: false,
        };
      })
      .addCase(getAllLikes.rejected, (state, action) => {
        const productId = action.meta.arg;
        if (state.likes[productId]) state.likes[productId].loading = false;
        state.error = action.payload || "حدث خطأ في جلب الإعجابات";
      })
      .addCase(toggleLikeThunk.pending, (state, action) => {
        const productId = action.meta.arg;
        if (!state.likes[productId]) {
          state.likes[productId] = {
            totalLikes: 0,
            liked: false,
            loading: true,
          };
        } else {
          state.likes[productId].loading = true;
        }
        state.error = null;
      })
      .addCase(toggleLikeThunk.fulfilled, (state, action) => {
        const { productId, totalLikes, liked } = action.payload;
        state.likes[productId] = {
          totalLikes,
          liked,
          loading: false,
        };
      })
      .addCase(toggleLikeThunk.rejected, (state, action) => {
        const productId = action.meta.arg;
        if (state.likes[productId]) state.likes[productId].loading = false;
        state.error = action.payload || "حدث خطأ في تبديل الإعجاب";
      });
  },
});

export default likeSlice.reducer;
