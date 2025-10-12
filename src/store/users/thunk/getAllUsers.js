// store/users/thunk/getAllUsers.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { handleThunkError } from "../../../utils/utils";

export const getAllUsers = createAsyncThunk(
  "/getAllUsers",
  async ({ page, search = "" }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `/admin/search_user?page=${page}&limit=3&search=${encodeURIComponent(
          search
        )}`,
        {
          headers: {
            authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
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
