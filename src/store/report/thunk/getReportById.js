import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { handleThunkError } from "../../../utils/utils";

export const getReportById = createAsyncThunk(
  "/report/getReportById",
  async (reporteId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/user/get_one_report/${reporteId}`, {
        headers: {
          authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      return res.data;
    } catch (error) {
      return handleThunkError(error, rejectWithValue);
    }
  }
);
