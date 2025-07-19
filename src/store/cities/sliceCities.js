import { createSlice } from "@reduxjs/toolkit";
import { thunkCities } from "./thunk/citiesThunk";
const initialState = {
  loadingCity: false,
  error: null,
  cities: [],
};
const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(thunkCities.pending, (state) => {
      (state.loadingCity = true), (state.error = null);
    });
    builder.addCase(thunkCities.fulfilled, (state, action) => {
      state.error = null;
      state.loadingCity = false;
      state.cities = action.payload;
    });
    builder.addCase(thunkCities.rejected, (state, action) => {
      state.loadingCity = false;
      state.error = action.payload;
    });
  },
});
export default citiesSlice.reducer;
