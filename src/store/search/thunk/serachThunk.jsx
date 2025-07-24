import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const searchThunk = createAsyncThunk(
  "/user/search_product",
  async (word, { rejectWithValue }) => {
    try {
      const res = await axios.get(`user/search_product?keyword=${word}`);
      return res.data?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
