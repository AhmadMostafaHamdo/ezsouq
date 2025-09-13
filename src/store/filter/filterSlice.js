// store/filters/filterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  governorate: "",
  city: "",
  category: "سيارات",
  sortBy: "",
  order: "",
  page: 1,
  limit: 6,
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetFilters: () => initialState,   
  },
});

export const { setFilter, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;
