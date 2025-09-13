import { createSlice } from "@reduxjs/toolkit";
import { thunkStatistic } from "./thunk/statisticThunk";
import { statisticThunkCategory } from "./thunk/statisticThunkCategory";
import { topUsers } from "./thunk/topUsers";
import { topProducts } from "./thunk/topProducts";

const initialState = {
  statistic: [],
  statisticCategories: [],
  topTwoUsers: [],
  topTwoProducts: [],
  loading: false,
  error: null,
};
const statisticSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(thunkStatistic.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(thunkStatistic.fulfilled, (state, action) => {
      state.loading = false;
      state.statistic = action.payload;
    });
    builder.addCase(thunkStatistic.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(statisticThunkCategory.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(statisticThunkCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.statisticCategories = action.payload;
    });
    builder.addCase(statisticThunkCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(topUsers.pending, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(topUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.topTwoUsers = action.payload;
      state.error = action.payload;
    });
    builder.addCase(topUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(topProducts.pending, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(topProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.topTwoProducts = action.payload;
      state.error = action.payload;
    });
    builder.addCase(topProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export default statisticSlice.reducer;
