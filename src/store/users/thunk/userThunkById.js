import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const userThunkById = createAsyncThunk(
  "/users/id",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/user/get_user/${userId}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
