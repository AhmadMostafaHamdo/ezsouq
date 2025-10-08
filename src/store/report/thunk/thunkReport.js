import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { handleThunkError } from "../../../utils/utils";
export const thunkReport = createAsyncThunk(
  "/report",
  async (
    { reported_user, details, reason, productId },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post(
        "/user/report_user",
        { reported_user, details, reason },
        {
          headers: {
            authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      toast.success(res.data?.message);
      setTimeout(() => {
        window.location.href = `/offer-details/${productId}`;
      }, 700);
      return res.data;
    } catch (error) {
      console.log(error);
      return handleThunkError(error, rejectWithValue);
    }
  }
);
