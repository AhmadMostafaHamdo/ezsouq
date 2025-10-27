import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";

export const updateUserPhoto = createAsyncThunk(
  "users/updatePhoto",
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("avatar", file);
      const res = await axios.put(import.meta.env.VITE_USER_UPDATE_PHOTO_ENDPOINT, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      toast.success(res.data?.message);
      return res.data;
    } catch (error) {
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
