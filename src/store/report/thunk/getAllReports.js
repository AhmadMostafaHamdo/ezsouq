import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { handleThunkError } from "../../../utils/utils";

export const getAllReports = createAsyncThunk(
  "/report/getAllReports",
  async ({ page = 1, limit = 10 } = {}, { rejectWithValue }) => {
    try {
      const res = await axios.get("/admin/all_reports", {
        headers: {
          authorization: `Bearer ${Cookies.get("token")}`,
        },
        params: {
          page,
          limit,
        },
      });
      return res.data;
    } catch (error) {
      return handleThunkError(error, rejectWithValue);
    }
  }
);
