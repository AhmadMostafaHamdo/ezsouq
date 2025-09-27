import { createAsyncThunk } from "@reduxjs/toolkit";
import { data } from "autoprefixer";
import axios from "axios";
import { toast } from "react-toastify";
import { handleThunkError } from "../../../utils/utils";

export const productThunk = createAsyncThunk(
  "products/fetch",
  async (filters, { rejectWithValue }) => {
    try {
      // بناء سلسلة الاستعلام من كائن الفلتر
      const queryParams = new URLSearchParams();
      // إضافة المعلمات فقط إذا كانت لها قيمة
      if (filters.governorate)
        queryParams.append("governorates", filters.governorate);
      if (filters.city) queryParams.append("city", filters.city);
      if (filters.category) queryParams.append("Category", filters.category);
      if (filters.sortBy) queryParams.append("sortBy", filters.sortBy);
      if (filters.page) queryParams.append("page", filters.page);
      if (filters.limit) queryParams.append("limit", filters.limit);
      // التصحيح: إضافة المسار الصحيح
      const url =
        filters.category != "منوعات"
          ? `/user/fliteredProducts?${queryParams.toString()}`
          : `/user/fliteredProducts?page=${filters.page}&city=${filters.city}&governorate=${filters.governorate}&limit=8`;
      const res = await axios.get(url);
      console.log(res.data);
      console.log("first");
      // إرجاع البيانات مع معلومات الترحيم
      return {
        products: res?.data?.items,
        totalItems: res?.data?.totalItems,
        totalPages: res?.data?.totalPages,
        currentPage: res?.data?.currentPage,
      };
    } catch (error) {
      return handleThunkError(error, rejectWithValue);
    }
  }
);
