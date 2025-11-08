// thunkReport.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { handleThunkError } from "../../../utils/utils";
import { replace } from "lodash";

export const thunkReport = createAsyncThunk(
  "user/report",
  async (
    { reported_user, details, reason, productId, navigate },
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

      // Smooth redirect after success
      setTimeout(() => {
        navigate(`/offer-details/${productId}`, { replace: true });
      }, 700);

      return res.data;
    } catch (error) {
      console.error(error);
      return handleThunkError(error, rejectWithValue);
    }
  }
);
