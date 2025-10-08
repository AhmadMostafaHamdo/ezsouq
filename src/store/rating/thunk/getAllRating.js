// === Get all ratings with pagination ===
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const getAllRateing = createAsyncThunk(
  "/getAllRateing",
  async (page = 1, { rejectWithValue }) => {
    try {
      // Send page & limit to backend
      const res = await axios.get(`/admin/rated_users?page=${page}&limit=3`, {
        headers: {
          authorization: `Bearer ${Cookies.get("token")}`,
        },
      });

      console.log("📄 Response:", res.data);

      // Return data and pagination info
      return res.data
    } catch (error) {
      console.log(error);
      let errorMessage = "حدث خطأ غير متوقع";

      if (error.message === "Network Error" || error.code === "ERR_NETWORK") {
        errorMessage =
          "لا يوجد اتصال بالإنترنت، يرجى التحقق من الاتصال والمحاولة مرة أخرى";
      } else if (
        error.code === "ECONNABORTED" ||
        error.message.includes("timeout")
      ) {
        errorMessage = "انتهت مهلة الاتصال، يرجى المحاولة مرة أخرى";
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);
