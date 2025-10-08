import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const getRatingById = createAsyncThunk(
  "/getRatingById",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/admin/rated_user/${userId}`, {
        headers: {
          authorization: `Bearer ${Cookies.get("token")}`,
        },
      });

      console.log("User rating:", res.data);

      return res.data?.data;
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
