import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const productThunkById = createAsyncThunk(
  "/products/id",
  async ({ id }) => {
    try {
      const res = await axios.get(`/user/sortedProducts/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
