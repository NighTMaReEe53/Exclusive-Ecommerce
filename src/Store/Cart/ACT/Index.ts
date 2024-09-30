import { createSelector, createSlice } from "@reduxjs/toolkit";
import { ICollection } from "../../../interfaces/Index";
import { RootState } from "../../Store";

interface IinitialState {
  cart: ICollection[];
  count: number;
  isAllow: boolean;
}

const initialState: IinitialState = {
  cart: [],
  count: 1,
  isAllow: true,
};

const cart_Slice = createSlice({
  name: "CARTSLICE",
  initialState,
  reducers: {
    INCREMENT: (state) => {
      if (state.count === 20) {
        state.count = 20;
      } else {
        state.count++;
      }
    },
    DECREMENT: (state) => {
      if (state.count === 1) {
        state.count = 1;
      } else {
        state.count--;
      }
    },
    RESETCOUNT: (state) => {
      state.count = 1;
    },
  },
});

export const TOTAL = createSelector(
  (state: RootState) => state.cart,
  (item) => {
    const TOTAL_WE_GET = item.cart.reduce((acc, current) => {
      acc +=
        current?.attributes?.products?.data[0]?.attributes?.price *
        current?.attributes?.new_qty;

      return acc;
    }, 0);

    return TOTAL_WE_GET;
  }
);

export const { INCREMENT, DECREMENT, RESETCOUNT } = cart_Slice.actions;
export default cart_Slice.reducer;
