import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const thunkAuth = createAsyncThunk(
  "authThunk/auth",
  async ({ info, isLogin }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`/${isLogin ? "login" : "register"}`, info);
      console.log(res.data);
      toast.success(
        `${isLogin ? "تم تسجيل الدخول بنجاح" : "تم إنشاء الحساب بنجاح"}`
      );
      return res.data;
    } catch (error) {
      console.log(error);
      let errorMessage = "حدث خطأ غير متوقع";

      // Handle network errors (no internet connection)
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
