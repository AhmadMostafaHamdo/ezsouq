import { createSlice } from "@reduxjs/toolkit";
import { thunkReport } from "./thunk/thunkReport";
const initialState = {
  loading: false,
  error: null,
  reports: [],
};
const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(thunkReport.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(thunkReport.fulfilled, (state, action) => {
      state.error = null;
      state.loading = false;
    });
    builder.addCase(thunkReport.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export default reportSlice.reducer;
