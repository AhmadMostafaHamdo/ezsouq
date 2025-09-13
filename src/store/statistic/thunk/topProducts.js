import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
export const topProducts = createAsyncThunk(
  "/topProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/admin/top_products", {
        headers: {
          authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
          return res?.data?.topLikedProducts;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
