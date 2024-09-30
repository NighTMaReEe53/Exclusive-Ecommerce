import { configureStore } from "@reduxjs/toolkit";

import cart_slice from "./Cart/ACT/Index";
import CounterSlice from "./CounterData/CounterSlice";
import openCloseSlice from "./Welcome/WelcomeAction";

export const store = configureStore({
  reducer: {
    cart: cart_slice,
    counter: CounterSlice,
    open: openCloseSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
