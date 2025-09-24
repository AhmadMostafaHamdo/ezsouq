import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
export const addGovernorate = createAsyncThunk(
  "governorates/addGovernorate",
  async ({ data }, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token");
      const res = await axios.post(
        "/admin/add_governorates",
        {
          name: data.governorate,
          cities: data.cities,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data);
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
