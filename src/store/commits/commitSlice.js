import { createSlice } from "@reduxjs/toolkit";
import { thunkAddCommit } from "./thunk/thunkAddCommit";
import { getAllCommentsByIdThunk } from "./thunk/getAllCommentsById";
const initialState = {
  loading: false,
  error: null,
  comments: [],
};
const commitsSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(thunkAddCommit.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(thunkAddCommit.fulfilled, (state, action) => {
      state.error = null;
      state.loading = false;
    });
    builder.addCase(thunkAddCommit.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getAllCommentsByIdThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllCommentsByIdThunk.fulfilled, (state, action) => {
      state.error = null;
      state.loading = false;
      state.comments = action.payload;
    });
    builder.addCase(getAllCommentsByIdThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export default commitsSlice.reducer;
