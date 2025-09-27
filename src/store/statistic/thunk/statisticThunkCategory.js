import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { handleThunkError } from "../../../utils/utils";
export const statisticThunkCategory = createAsyncThunk(
  "/statisticThunkCategory",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/admin/category_statistics", {
        headers: {
          authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      return res?.data?.result;
    } catch (error) {
      return handleThunkError(error, rejectWithValue);
    }
  }
);
