// 🏙️ Governorates Slice
import { createSlice } from "@reduxjs/toolkit";
import { thunkGovernorates } from "./thunk/thunkGovernorates";
import { deleteGovernorate } from "./thunk/deleteGovernorate";

const initialState = {
  loading: false,
  error: null,
  governorates: [],
};

const governoratesSlice = createSlice({
  name: "governorates",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 🟢 Fetch governorates
      .addCase(thunkGovernorates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(thunkGovernorates.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.governorates = action.payload;
      })
      .addCase(thunkGovernorates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete governorate
      .addCase(deleteGovernorate.fulfilled, (state, action) => {
        state.governorates = state.governorates.filter(
          (gov) => gov._id !== action.payload.id
        );
      });
  },
});

export default governoratesSlice.reducer;
