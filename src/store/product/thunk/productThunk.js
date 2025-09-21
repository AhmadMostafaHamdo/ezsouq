import { createAsyncThunk } from "@reduxjs/toolkit";
import { data } from "autoprefixer";
import axios from "axios";

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
      const url = `/user/fliteredProducts?${queryParams.toString()}`;
      const res = await axios.get(url);
      // إرجاع البيانات مع معلومات الترحيم
      return {
        products: res?.data?.items,
        totalItems: res?.data?.totalItems,
        totalPages: res?.data?.totalPages,
        currentPage: res?.data?.currentPage,
      };
    } catch (error) {
      let errorMessage = "حدث خطأ غير متوقع";

      // Handle network errors (no internet connection)
      if (error.message === "Network Error" || error.code === "ERR_NETWORK") {
        errorMessage =
          "لا يوجد اتصال بالإنترنت، يرجى التحقق من الاتصال والمحاولة مرة أخرى";
      }
      // Handle timeout errors
      else if (
        error.code === "ECONNABORTED" ||
        error.message.includes("timeout")
      ) {
        errorMessage = "انتهت مهلة الاتصال، يرجى المحاولة مرة أخرى";
      }
      // Handle server response errors
      else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);
