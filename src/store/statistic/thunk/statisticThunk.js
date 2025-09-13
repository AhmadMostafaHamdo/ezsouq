import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
export const thunkStatistic = createAsyncThunk(
  "/statistics",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/admin/statistics", {
        headers: {
          authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      return res?.data?.counts;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
