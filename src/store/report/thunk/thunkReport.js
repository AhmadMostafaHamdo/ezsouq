import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
export const thunkReport = createAsyncThunk(
  "/report",
  async ({ productId, message, reason }, { rejectWithValue }) => {
    try {
      console.log({ productId, message, reason });
      const res = await axios.post(
        "user/report",
        { productId, message, reason },
        {
          headers: {
            authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      console.log(res.data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
