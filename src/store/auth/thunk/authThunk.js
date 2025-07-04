import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
export const thunkAuth = createAsyncThunk(
  "authThunk/auth",
  async ({ info, isLogin }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`/${isLogin ? "login" : "register"}`, info);
      console.log(res);
      toast.success(
        `${isLogin ? "تم تسجيل الدخول بنجاح" : "تم إنشاء الحساب بنجاح"}`
      );

      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "حدث خطأ غير متوقع";
      toast.error(errorMessage);
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
