import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const thunkCities = createAsyncThunk(
  "/user/cities",
  async (governorateName, { rejectWithValue }) => {
    try {
      console.log(governorateName);
      const res = await axios.get("user/cities", {
        name: governorateName,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
