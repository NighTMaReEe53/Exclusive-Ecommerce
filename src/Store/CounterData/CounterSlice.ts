import { createSlice } from "@reduxjs/toolkit";

const initialState: { counter: number } = {
  counter: 0,
};

const counterSlice = createSlice({
  name: "CounterSlice",
  initialState,
  reducers: {
    COUNTERINCREASEDATA: (state) => {
      state.counter++;
    },
  },
});

export const { COUNTERINCREASEDATA } = counterSlice.actions;
export default counterSlice.reducer;
