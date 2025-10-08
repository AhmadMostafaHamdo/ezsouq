import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from 'js-cookie'
export const banUser = createAsyncThunk(
  "users/toggleBan",
  async ({ id, action }, { rejectWithValue }) => {
    console.log(id)
    try {
      const res = await axios.put(
        "/admin/toggleBanUser",
        { userId: id, action },
        {
          headers: {
            authorization: `Bearer ${Cookies.get("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response status:", res.status);
      console.log("Response data:", res.data);

      toast.success(
        action === "ban"
          ? "تم حظر المستخدم بنجاح"
          : "تم إلغاء حظر المستخدم بنجاح"
      );


      return res.data;
    } catch (error) {
      console.error("banUser error:", error);
      return handleThunkError(error, rejectWithValue);
    }
  }
);
