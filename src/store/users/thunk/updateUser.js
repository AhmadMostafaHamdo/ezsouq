import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { handleThunkError } from "../../../utils/utils";
export const updateUser = createAsyncThunk(
  "/updateUser",
  async (user, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        import.meta.env.VITE_USER_UPDATE_INFO_ENDPOINT,
        {
          name: user?.name,
          avatar: user?.avatar,
          phone: user?.phone,
          Location: user?.Location,
          workplace: user?.workplace,
          work_type: user?.work_type,
          whats_app: user?.whats_app,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      toast.success(res.data.message);
      return res.data.response;
    } catch (error) {
      return handleThunkError(error, rejectWithValue);
    }
  }
);
