import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { handleThunkError } from "../../../utils/utils";

export const getAllUsers = createAsyncThunk(
  "/getAllUsers",
  async ({ page, limit = 4 }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `/admin/get_all_users?page=${page}&limit=${limit}`,
        {
          headers: {
            authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      console.log(res.data);
      return {
        users: res?.data?.data || [],
        totalItems: res?.data?.totalItems || 0,
        totalPages: res?.data?.totalPages || 1,
        currentPage: page,
      };
    } catch (error) {
      return handleThunkError(error, rejectWithValue);
    }
  }
);
