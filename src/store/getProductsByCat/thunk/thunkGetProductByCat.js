import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const thunkGetProductByCat = createAsyncThunk(
  "productsByCat/fetch",
  async ({ category = null, page = 1 }, { rejectWithValue }) => {
    try {
      // رابط API يدعم page دائماً، وCategory إذا موجود
      const url = category
        ? `/user/fliteredProducts?Category=${category}&page=${page}&limit=8`
        : `/user/fliteredProducts?page=${page}&limit=8`;

      const res = await axios.get(url);
      return res.data; // يجب أن يحتوي على: items + totalPages + currentPage
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
