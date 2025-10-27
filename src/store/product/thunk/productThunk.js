import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { handleThunkError } from "../../../utils/utils";

export const productThunk = createAsyncThunk(
  "products/fetch",
  async (filters, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();
      if (filters.governorate)
        queryParams.append("governorates", filters.governorate);
      if (filters.city) queryParams.append("city", filters.city);
      if (filters.category) queryParams.append("Category", filters.category);
      if (filters.sortBy) queryParams.append("sortBy", filters.sortBy);
      if (filters.page) queryParams.append("page", filters.page);
      if (filters.limit) queryParams.append("limit", filters.limit);
      const url =
        filters.category != "منوعات"
          ? `${import.meta.env.VITE_USER_FILTERED_PRODUCTS_ENDPOINT}?${queryParams.toString()}`
          : `${import.meta.env.VITE_USER_FILTERED_PRODUCTS_ENDPOINT}?page=${filters.page}&city=${filters.city}&governorate=${filters.governorate}&limit=3`;
      const res = await axios.get(url);
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
