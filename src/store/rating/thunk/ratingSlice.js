import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const ratingThunk = createAsyncThunk(
  "/rating",
  async ({ userId, rating }, { rejectWithValue }) => {
    try {
      const res = await axios.post("", { user_id: userId, rating });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
