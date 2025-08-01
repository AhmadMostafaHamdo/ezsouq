// src/store/product/thunk/toggleLikeProduct.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const getAllLikesThunk = createAsyncThunk(
  "/getAllLikesThunk",
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `/user/get_all_likes?productId=${productId}`,
        {},
            {
          headers: {
            authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      return data?.count;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "حدث خطأ");
    }
  }
);
