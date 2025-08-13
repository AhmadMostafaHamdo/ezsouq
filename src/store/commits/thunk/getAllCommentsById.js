import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const getAllCommentsByIdThunk = createAsyncThunk(
  "/comments/getAll",
  async (product_id, { rejectWithValue }) => {
    try {
      if (!product_id) {
        console.warn("⚠️ getAllCommentsByIdThunk: product_id is missing");
        return rejectWithValue("Product ID is missing");
      }

      const res = await axios.get(`/user/all_comments/${product_id}`, {
        headers: {
          authorization: `Bearer ${Cookies.get("token")}`,
        },
      });

      return {
        productId: product_id,
        feedbacks: res?.data?.feedbacks || [],
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load comments"
      );
    }
  }
);
