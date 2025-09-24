import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
export const updateComment = createAsyncThunk(
  "/commits/updateCommit",
  async ({ comment_id, comments }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `/user/update_comment/${comment_id}`,
        { comments },
        {
          headers: {
            authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
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

      toastast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);
