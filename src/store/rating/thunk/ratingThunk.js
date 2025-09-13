  import { createAsyncThunk } from "@reduxjs/toolkit";
  import axios from "axios";
  import Cookies from "js-cookie";
  import { toast } from "react-toastify";

  export const ratingThunk = createAsyncThunk(
    "/rating_publisher",
    async ({ userId, rating }, { rejectWithValue }) => {
      try {
        const res = await axios.post(
          "/user/rating_publisher",
          {
            user_id: userId,  
            rating,
          },
          {
            headers: {
              authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );
        toast.success(res.data?.message);
        console.log(res.data);
        return res.data;
      } catch (error) {
        toast(error?.response?.data?.message);
        return rejectWithValue(error.response?.data?.message);
      }
    }
  );
