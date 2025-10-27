// store/users/thunk/deleteUser.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { handleThunkError } from "../../../utils/utils";
import { getAllUsers } from "./getAllUsers";

/**
 * Thunk to delete a user by ID
 * - Sends DELETE request with user_id
 * - Shows toast messages on success/error
 * - Refetches all users after deletion
 */
export const deleteUser = createAsyncThunk(
  "users/delete",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      if (!id) {
        return rejectWithValue("User ID is missing");
      }

      const res = await axios.delete(import.meta.env.VITE_ADMIN_DELETE_USER_ENDPOINT, {
        data: { user_id: id },
        headers: {
          authorization: `Bearer ${Cookies.get("token")}`,
        },
      });

      toast.success("تم حذف المستخدم بنجاح");

      // Refetch users list after deletion
      dispatch(getAllUsers({ page: 1, limit: 3, search: "" }));

      return res.data;
    } catch (error) {
      return handleThunkError(error, rejectWithValue);
    }
  }
);
