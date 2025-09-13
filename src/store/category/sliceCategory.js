import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: ["سيارات", "عقارات", "تقنيات"], // لا تضع خيار "التصنيف" كقيمة
  selectedCategory: "",
};

const sliceCategory = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const { setCategory } = sliceCategory.actions;
export default sliceCategory.reducer;
