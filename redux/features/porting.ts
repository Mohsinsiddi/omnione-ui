import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PortingState = {
  isPorting: boolean;
};

const initialState = {
  isPorting: false,
} as PortingState;

export const porting = createSlice({
  name: "porting",
  initialState,
  reducers: {
    reset: () => initialState,
    toggle: (state) => {
      state.isPorting = true;
    },
  },
});

export const { toggle, reset } = porting.actions;
export default porting.reducer;
