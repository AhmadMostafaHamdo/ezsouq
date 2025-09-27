import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { handleThunkError } from "../../../utils/utils";
export const userThunkById = createAsyncThunk(
  "`/users`/id  ",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/user/get_user/${userId}`);
      return res.data;
    } catch (error) {
      return handleThunkError(error, rejectWithValue);
    }
  }
);
