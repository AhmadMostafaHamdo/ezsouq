import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "axios";

export const logout = createAsyncThunk("/logout", async () => {
  try {
    const res = await axios.post(
      "/logout",
      {},
      {
        headers: {
          authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    console.log(res.data)
    return res.data;
  } catch (error) {
  } finally {
    Cookies.remove("token");
  }
  return null;
});
