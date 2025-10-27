import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { handleThunkError } from "../../../utils/utils";
export const thunkStatistic = createAsyncThunk(
  "/statistics",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(import.meta.env.VITE_ADMIN_STATISTICS_ENDPOINT, {
        headers: {
          authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      return res?.data?.counts;
    } catch (error) {
      return handleThunkError(error, rejectWithValue);
    }
  }
);
