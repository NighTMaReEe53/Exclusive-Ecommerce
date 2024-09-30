import { createSlice } from "@reduxjs/toolkit";

interface IStarted {
  open: boolean;
  openDrawer: boolean;
  openMenu: boolean;
}

const initialState: IStarted = {
  open: false,
  openDrawer: false,
  openMenu: false,
};

const openCloseSlice = createSlice({
  name: "OpenCloseSlice",
  initialState,
  reducers: {
    OpenAction: (state) => {
      state.open = true;
    },
  },
});

export const { OpenAction } = openCloseSlice.actions;
export default openCloseSlice.reducer;
