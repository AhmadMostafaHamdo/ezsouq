  import { createAsyncThunk } from "@reduxjs/toolkit";
  import axios from "axios";
  import { toast } from "react-toastify";
  export const thunkAuth = createAsyncThunk(
    "authThunk/auth",
    async ({ info, isLogin }, { rejectWithValue }) => {
      console.log(info);
      try {
        const res = await axios.post(`/${isLogin ? "login" : "register"}`, info);
        console.log(res.data);
        toast.success(
          `${isLogin ? "تم تسجيل الدخول بنجاح" : "تم إنشاء الحساب بنجاح"}`
        );
        return res.data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message);
      }
    }
  );
