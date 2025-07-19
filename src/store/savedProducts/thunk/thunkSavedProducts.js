import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const thunkSavedProducts = createAsyncThunk(
  "/products/saved",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/user/product/${id}`);
      console.log(res.data)
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

