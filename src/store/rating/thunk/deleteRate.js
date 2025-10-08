import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

/** Delete a specific user rating */
export const deleteRatedUser = createAsyncThunk(
  "rating/deleteRatedUser",
  async (ratingId, { rejectWithValue }) => {
    console.log(ratingId);
    try {
      const res = await axios.delete("/admin/deleted_rated_user", {
        headers: {
          authorization: `Bearer ${Cookies.get("token")}`,
          "Content-Type": "application/json",
        },
        data: { ratingId },
      });
      console.log("✅ تم حذف التقييم:", res.data);
      toast.success("تم حذف التقييم بنجاح");
      return res.data;
    } catch (error) {
      console.error("❌ خطأ أثناء الحذف:", error);
      let msg = "حدث خطأ غير متوقع";
      if (error.message === "Network Error" || error.code === "ERR_NETWORK")
        msg = "لا يوجد اتصال بالإنترنت، تحقق من الشبكة";
      else if (
        error.code === "ECONNABORTED" ||
        error.message.includes("timeout")
      )
        msg = "انتهت مهلة الاتصال، حاول مرة أخرى";
      else if (error.response?.data?.message) msg = error.response.data.message;

      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);
