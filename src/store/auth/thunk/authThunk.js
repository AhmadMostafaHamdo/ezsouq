  import { createAsyncThunk } from "@reduxjs/toolkit";
  import axios from "axios";
  import { toast } from "react-toastify";
  import { handleThunkError } from "../../../utils/utils";

  export const thunkAuth = createAsyncThunk(
    "authThunk/auth",
    async ({ info, isLogin }, { rejectWithValue }) => {
      try {
        const res = await axios.post(`/${isLogin ? "login" : "register"}`, info);
        toast.success(
          `${isLogin ? "تم تسجيل الدخول بنجاح" : "تم إنشاء الحساب بنجاح"}`
        );
        return res.data;
      } catch (error) {
        return handleThunkError(error, rejectWithValue);
      }
    }
  );
