import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { handleThunkError } from "../../../utils/utils";
export const userThunkMe = createAsyncThunk(
  "/users/me",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/user/get_user/${userId}`);
      return res.data;
    } catch (error) {
      return handleThunkError(error, rejectWithValue);
    }
  }
);
