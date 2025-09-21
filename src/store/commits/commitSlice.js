import { createSlice } from "@reduxjs/toolkit";
import { thunkAddCommit } from "./thunk/thunkAddCommit";
import { getAllCommentsByIdThunk } from "./thunk/getAllCommentsById";
import { deleteComment } from "./thunk/deleteCommit";
import { thunkReplayCommit } from "./thunk/replayComment";

const initialState = {
  loading: false,
  error: null,
  commentsByProductId: {},
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
      })
      .addCase(deleteComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = false;

        // إزالة التعليق من الواجهة مباشرة
        const { productId, comment_id } = action.meta.arg;
        if (productId && state.commentsByProductId[productId]) {
          state.commentsByProductId[productId] = state.commentsByProductId[
            productId
          ].filter((c) => c._id !== comment_id);
        }
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(thunkReplayCommit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(thunkReplayCommit.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(thunkReplayCommit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default commitsSlice.reducer;
