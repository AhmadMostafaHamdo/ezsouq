import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

//  Delete message by ID
export const deleteMessage = createAsyncThunk(
  "messages/deleteMessage",
  async (id, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token");
      const res = await axios.delete(`/admin/delete_message/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(res.data)
      return { id, message: res.data?.message || "تم حذف الرسالة بنجاح" };
    } catch (error) {
        console.log(error)
      const msg = error.response?.data?.message || "فشل حذف الرسالة";
      return rejectWithValue(msg);
    }
  }
);
