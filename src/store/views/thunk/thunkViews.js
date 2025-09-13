import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const viewsThunk = createAsyncThunk(
  "/views",
  async (productId, { rejectWithValue }) => {
    try {
      if (!productId) {
        return rejectWithValue("User ID is missing");
      }

      const res = await axios.put(
        `/user/set_count_views/${productId}`,
        {},
        {
          headers: {
            authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user"
      );
    }
  }
);
