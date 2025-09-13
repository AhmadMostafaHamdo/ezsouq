import { createSlice } from "@reduxjs/toolkit";
import { thunkGetProductByCat } from "./thunk/thunkGetProductByCat";

const initialState = {
  products: [],
  loading: false,
  error: null,
  totalPages: 1,
};

const productByCatSlice = createSlice({
  name: "productsByCat",
  initialState,
  reducers: {
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
        state.products = action.payload;
      })
      .addCase(thunkGetProductByCat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setLikeLocalByCat } = productByCatSlice.actions;
export default productByCatSlice.reducer;
