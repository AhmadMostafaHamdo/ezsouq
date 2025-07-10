import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const usersThunk = createAsyncThunk(
  "/users",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/get_user/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
