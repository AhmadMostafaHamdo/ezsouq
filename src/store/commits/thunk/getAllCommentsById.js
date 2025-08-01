import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllCommentsByIdThunk = createAsyncThunk(
  "/comments/getAll",
  async (product_id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/user/all_comments/${product_id}`, {
        headers: {
          authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      return {
        productId: product_id,
        feedbacks: res?.data?.feedbacks,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
