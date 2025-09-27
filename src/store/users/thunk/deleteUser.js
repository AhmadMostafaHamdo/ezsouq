import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { handleThunkError } from "../../../utils/utils";

export const deleteUser = createAsyncThunk(
  "/users",
  async (id, { rejectWithValue }) => {
    try {
      if (!id) {
        return rejectWithValue("User ID is missing");
      }
      const res = await axios.delete("admin/Delet_User", {
        data: { user_id: id },
        headers: {
          authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      toast.success("تم حذف المستخدم بنجاح");
      return res.data;
    } catch (error) {
      return handleThunkError(error, rejectWithValue);
    }
  }
);
