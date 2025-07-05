import { createSlice } from "@reduxjs/toolkit";
import { thunkCities } from "./thunk/citiesThunk";
const initialState = {
  loading: false,
  error: null,
  cities: [],
};
const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(thunkCities.pending, (state) => {
      (state.loading = true), (state.error = null);
    });
    builder.addCase(thunkCities.fulfilled, (state, action) => {
      state.error = null;
      state.loading = false;
      state.cities = action.payload;
    });
    builder.addCase(thunkCities.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export default citiesSlice.reducer;
