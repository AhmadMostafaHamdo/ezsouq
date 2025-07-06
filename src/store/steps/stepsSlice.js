import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentStep: 1,
};
const stepsSlice = createSlice({
  name: "steps",
  initialState,
  reducers: {
    stepIncrease: (state) => {
      state.currentStep += 1;
    },
    stepDecrease: (state) => {
      state.currentStep -= 1;
    },
  },
});
export const { stepIncrease, stepDecrease } = stepsSlice.actions;
export default stepsSlice.reducer;
