// store/commits/thunk/getRepliesByCommentId.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getRepliesByCommentId = createAsyncThunk(
  "comments/getRepliesByCommentId",
  async (comment_id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/user/one_comment/${comment_id}`);
      console.log(data)
      return { comment_id, replies: data?.replies || [] };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "خطأ في جلب الردود"
      );
    }
  }
);
