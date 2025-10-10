  // 🗑️ Delete Governorate Thunk
  import { createAsyncThunk } from "@reduxjs/toolkit";
  import axios from "axios";
  import { toast } from "react-toastify";
  import Cookies from "js-cookie";

  export const deleteGovernorate = createAsyncThunk(
    "governorates/deleteGovernorate",
    async (governorate_id, { rejectWithValue }) => {
      console.log(governorate_id);
      try {
        const token = Cookies.get("token");

        const res = await axios.delete(
          `/admin/delete_governorate/${governorate_id}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        toast.success(res.data?.message);
        return { id: governorate_id }; // return ID for local removal
      } catch (error) {
        let errorMessage = "حدث خطأ غير متوقع";

        if (error.message === "Network Error" || error.code === "ERR_NETWORK") {
          errorMessage = "لا يوجد اتصال بالإنترنت، يرجى المحاولة لاحقًا";
        } else if (
          error.code === "ECONNABORTED" ||
          error.message.includes("timeout")
        ) {
          errorMessage = "انتهت مهلة الاتصال، يرجى المحاولة مجددًا";
        } else if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        }

        toast.error(errorMessage);
        return rejectWithValue(errorMessage);
      }
    }
  );
