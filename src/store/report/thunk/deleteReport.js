import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { handleThunkError } from "../../../utils/utils";
export const deleteReport = createAsyncThunk(
  "/report/deleteReport",
  async (reporteId, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`/user/delete_report/${reporteId}`, {
        headers: {
          authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      toast.success(res.data?.message);
      return res.data;
    } catch (error) {
      console.log(error);
      return handleThunkError(error, rejectWithValue);
    }
  }
);
