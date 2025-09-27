import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { handleThunkError } from "../../../utils/utils";
export const topUsers = createAsyncThunk(
  "/topUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/admin/top_users", {
        headers: {
          authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      return res?.data?.topUsers;
    } catch (error) {
      return handleThunkError(error, rejectWithValue);
    }
  }
);
