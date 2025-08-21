import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: ["التصنيف", "سيارات", "عقارات", "تقنيات"],
  selectedCategory: "",
};
const sliceCategory = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
});
export const { setCategory } = sliceCategory.actions;
export default sliceCategory.reducer;
