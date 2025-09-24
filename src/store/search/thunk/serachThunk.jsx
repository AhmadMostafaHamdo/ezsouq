import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const searchThunk = createAsyncThunk(
  "/user/search_product",
  async ({ keyword, page = 1 }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `user/search_product?keyword=${keyword}&page=${page}`
      );
      console.log(res.data)
      return res.data;
    } catch (error) {
      let errorMessage = "حدث خطأ غير متوقع";

      // Handle network errors
      if (error.message === "Network Error" || error.code === "ERR_NETWORK") {
        errorMessage =
          "لا يوجد اتصال بالإنترنت، يرجى التحقق من الاتصال والمحاولة مرة أخرى";
      }
      // Handle timeout errors
      else if (
        error.code === "ECONNABORTED" ||
        error.message.includes("timeout")
      ) {
        errorMessage = "انتهت مهلة الاتصال، يرجى المحاولة مرة أخرى";
      }
      // Handle server response errors
      else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);
