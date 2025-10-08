import { createSlice } from "@reduxjs/toolkit";
import { ratingThunk } from "./thunk/ratingThunk";
import { getAllRateing } from "./thunk/getAllRating";
import { deleteRatedUser } from "./thunk/deleteRate";
import { getRatingById } from "./thunk/getRatingById";

const initialState = {
  loading: false,
  error: null,
  rating: 0,
  rate: [],
  rateById: {},
  pagination: { page: 1, totalPages: 1, totalCount: 0 },
};

const ratingSlice = createSlice({
  name: "rating",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // === Add rating ===
    builder
      .addCase(ratingThunk.pending, (s) => {
        s.loading = true;
      })
      .addCase(ratingThunk.fulfilled, (s) => {
        s.loading = false;
      })
      .addCase(ratingThunk.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      });

    // === Get all ratings ===
    builder
      .addCase(getAllRateing.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(getAllRateing.fulfilled, (s, a) => {
        s.loading = false;
        s.rate = a.payload.data;
        s.pagination = a.payload.pagination;
      })
      .addCase(getAllRateing.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      });
    // === Get Rating By Id ===
    builder
      .addCase(getRatingById.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(getRatingById.fulfilled, (s, a) => {
        s.loading = false;
        s.rateById = a.payload;
      })
      .addCase(getRatingById.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      });

    // === Delete rating ===
    builder
      .addCase(deleteRatedUser.pending, (s) => {
        s.loading = true;
      })
      .addCase(deleteRatedUser.fulfilled, (s, a) => {
        s.loading = false;
        const { ratedUserId, ratedByUserId } = a.meta.arg;
        s.rate = s.rate.filter(
          (r) =>
            r.ratedUserId !== ratedUserId || r.ratedByUserId !== ratedByUserId
        );
      })
      .addCase(deleteRatedUser.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      });
  },
});

export default ratingSlice.reducer;
