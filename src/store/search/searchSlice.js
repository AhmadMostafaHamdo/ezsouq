import { createSlice } from "@reduxjs/toolkit";
import { searchThunk } from "./thunk/serachThunk";

const initialState = {
  loading: false,
  error: null,
  data: [],
  currentPage: 1,
  totalPages: 0,
  totalItems: 0,
};

const searchedProductsSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    resetSearch: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        // Update with API response data
        state.data = action.payload.data || [];
        state.currentPage = action.payload.currentPage || 1;
        state.totalPages = action.payload.totalPages || 0;
        state.totalItems = action.payload.totalItems || 0;
      })
      .addCase(searchThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;

        // Clear data on error
        state.data = [];
        state.currentPage = 1;
        state.totalPages = 0;
        state.totalItems = 0;
      });
  },
});

export const { setCurrentPage, resetSearch } = searchedProductsSlice.actions;
export default searchedProductsSlice.reducer;
