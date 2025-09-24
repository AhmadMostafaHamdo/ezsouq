import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const getAllCommentsByIdThunk = createAsyncThunk(
  "/comments/getAll",
  async (product_id, { rejectWithValue }) => {
    try {
      if (!product_id) {
        return rejectWithValue("Product ID is missing");
      }

      const res = await axios.get(`/user/all_comments/${product_id}`, {
        headers: {
          authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      console.log(res.data);
      return {
        productId: product_id,
        feedbacks: res?.data?.feedbacks || [],
      };
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
