import { createAsyncThunk } from "@reduxjs/toolkit";
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
        totalPages: res.data.totalPages,
        currentPage: filters.page,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "حدث خطأ في جلب المنتجات"
      );
    }
  }
);
