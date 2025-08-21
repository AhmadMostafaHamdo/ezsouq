import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  steps: [1, 2],
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
    clearStep: (state) => {
      state.currentStep = 1;
    },
  },
});
export const { stepIncrease, stepDecrease, clearStep } = stepsSlice.actions;
export default stepsSlice.reducer;
