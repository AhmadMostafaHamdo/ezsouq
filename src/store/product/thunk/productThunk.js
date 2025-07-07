import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const productThunk = createAsyncThunk(
  "/products",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/user/sortedProducts");
      console.log(res.data)
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
