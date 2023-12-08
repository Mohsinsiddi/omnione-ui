import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SubnavState = {
  isPort: boolean;
  isDashboard: boolean;
  isExplorer: boolean;
};

const initialState = {
  isPort: true,
  isDashboard: false,
  isExplorer: false,
} as SubnavState;

export const subnav = createSlice({
  name: "porting",
  initialState,
  reducers: {
    reset: () => initialState,
    activePort: (state) => {
      state.isPort = true;
      state.isDashboard = false;
      state.isExplorer = false;
    },
    activeDashboard: (state) => {
      state.isPort = false;
      state.isDashboard = true;
      state.isExplorer = false;
    },
    activeExplorer: (state) => {
      state.isPort = false;
      state.isDashboard = false;
      state.isExplorer = true;
    },
  },
});

export const { activePort, activeDashboard, activeExplorer, reset } =
  subnav.actions;
export default subnav.reducer;
