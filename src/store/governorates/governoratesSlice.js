import { createSlice } from "@reduxjs/toolkit";
import { thunkGovernorates } from "./thunk/thunkGovernorates";
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
    builder.addCase(thunkGovernorates.pending, (state) => {
      (state.loading = true), (state.error = null);
    });
    builder.addCase(thunkGovernorates.fulfilled, (state, action) => {
      state.error = null;
      state.loading = false;
      state.governorates = action.payload;
    });
    builder.addCase(thunkGovernorates.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export default governoratesSlice.reducer;
