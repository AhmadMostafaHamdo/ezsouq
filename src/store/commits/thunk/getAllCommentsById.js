import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
export const getAllCommentsByIdThunk = createAsyncThunk(
  "/comments/getAll",
  async ({ product_id, page = 1 }, { rejectWithValue }) => {
    try {
      if (!product_id) return rejectWithValue("Product ID is missing");

      const res = await axios.get(
        `/user/all_comments/${product_id}?page=${page}`,
        {
          headers: {
            authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      console.log(res.data)
      return {
        productId: product_id,
        feedbacks: res?.data?.feedbacks || [],
        page: res?.data?.page,
        pages: res?.data?.pages,
        total: res?.data?.total,
      };
    } catch (error) {
      console.log(error);
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
