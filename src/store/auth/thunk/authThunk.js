import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const thunkAuth = createAsyncThunk(
  "authThunk/auth",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("/register", data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
