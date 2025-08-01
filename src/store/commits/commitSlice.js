import { createSlice } from "@reduxjs/toolkit";
import { thunkAddCommit } from "./thunk/thunkAddCommit";
import { getAllCommentsByIdThunk } from "./thunk/getAllCommentsById";

const initialState = {
  loading: false,
  error: null,
  commentsByProductId: {}, // بدل من comments: []
};

const commitsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(thunkAddCommit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(thunkAddCommit.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(thunkAddCommit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllCommentsByIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCommentsByIdThunk.fulfilled, (state, action) => {
        const { productId, feedbacks } = action.payload;
        state.loading = false;
        state.commentsByProductId[productId] = feedbacks;
      })
      .addCase(getAllCommentsByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default commitsSlice.reducer;
