import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const thunkGovernorates = createAsyncThunk(
  "/governorates",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("user/governorates");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
