import { createSlice } from "@reduxjs/toolkit";
import { getAllReports } from "./thunk/getAllReports";
import { deleteReport } from "./thunk/deleteReport";
import { getReportById } from "./thunk/getReportById";
import { thunkReport } from "./thunk/thunkReport";

const initialState = {
  reports: [],
  report: [],
  count: 0,
  page: 1,
  pages: 1,
  total: 0,
  loading: false,
  error: null,
};

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllReports.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = action.payload.reports || [];
        state.count = action.payload.count || 0;
        state.page = action.payload.page || 1;
        state.pages = action.payload.pages || 1;
        state.total = action.payload.total || 0;
      })
      .addCase(getAllReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })
      .addCase(thunkReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(thunkReport.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(thunkReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })
      .addCase(deleteReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReport.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })
      .addCase(getReportById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReportById.fulfilled, (state, action) => {
        state.loading = false;
        state.report = action.payload.report;
      })
      .addCase(getReportById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default reportSlice.reducer;
