import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const getAllCommentsByIdThunk = createAsyncThunk(
  "/users",
  async (product_id, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `/user/all_comments/${product_id}`,
        {},
        {
          headers: {
            authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      return res?.data?.feedbacks;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
