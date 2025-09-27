// searchThunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const searchThunk = createAsyncThunk(
  "/user/search_product",
  async (params, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams();

      // مرر كل الفلاتر بشكل ديناميكي
      Object.entries(params).forEach(([key, value]) => {
        if (value !== "" && value !== null && value !== undefined) {
          query.append(key, value);
        }
      });

      const res = await axios.get(`/user/search_product?${query.toString()}`);
      console.log("🔍 Search Response:", res.data);
      return res.data;
    } catch (error) {
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
