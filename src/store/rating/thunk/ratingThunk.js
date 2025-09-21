  import { createAsyncThunk } from "@reduxjs/toolkit";
  import axios from "axios";
  import Cookies from "js-cookie";
  import { toast } from "react-toastify";

  export const ratingThunk = createAsyncThunk(
    "/rating_publisher",
    async ({ userId, rating }, { rejectWithValue }) => {
      try {
        const res = await axios.post(
          "/user/rating_publisher",
          {
            user_id: userId,
            rating,
          },
          {
            headers: {
              authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );
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
