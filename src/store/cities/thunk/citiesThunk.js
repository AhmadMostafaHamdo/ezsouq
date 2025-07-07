import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const thunkCities = createAsyncThunk(
  "/user/cities",
  async (governorateName, { rejectWithValue }) => {
    try {
      const res = await axios.get(`user/cities/${governorateName}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
