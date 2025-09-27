import { createSlice } from "@reduxjs/toolkit";
import { thunkAddCommit } from "./thunk/thunkAddCommit";
import { getAllCommentsByIdThunk } from "./thunk/getAllCommentsById";
import { deleteComment } from "./thunk/deleteCommit";
import { thunkReplayCommit } from "./thunk/replayComment";
import { getRepliesByCommentId } from "./thunk/getRepliesByCommentId";

const initialState = {
  loading: false,
  error: null,
  commentsByProductId: {}, // { [productId]: { comments: [], page, pages, total } }
  replies: {},
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
        const { productId, feedbacks, page, pages, total } = action.payload;
        state.loading = false;

        if (!state.commentsByProductId[productId]) {
          state.commentsByProductId[productId] = {
            comments: [],
            page: 1,
            pages: 1,
            total: 0,
          };
        }

        if (page === 1) {
          state.commentsByProductId[productId] = {
            comments: feedbacks,
            page,
            pages,
            total,
          };
        } else {
          const existingComments =
            state.commentsByProductId[productId].comments;
          state.commentsByProductId[productId] = {
            comments: [
              ...existingComments,
              ...feedbacks.filter(
                (f) => !existingComments.some((e) => e._id === f._id)
              ),
            ],
            page,
            pages,
            total,
          };
        }
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
        const { productId, comment_id } = action.meta.arg;
        if (productId && state.commentsByProductId[productId]) {
          state.commentsByProductId[productId].comments =
            state.commentsByProductId[productId].comments.filter(
              (c) => c._id !== comment_id
            );
          state.commentsByProductId[productId].total -= 1;
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
      .addCase(thunkReplayCommit.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(thunkReplayCommit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getRepliesByCommentId.fulfilled, (state, action) => {
        const { comment_id, replies } = action.payload;
        state.replies[comment_id] = replies;
      });
  },
});

export default commitsSlice.reducer;
