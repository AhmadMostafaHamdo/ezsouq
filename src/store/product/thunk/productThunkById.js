import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const productThunkById = createAsyncThunk(
  "/products/id",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/user/product/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
