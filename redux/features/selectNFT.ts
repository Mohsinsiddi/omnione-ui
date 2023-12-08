import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type NFTSelectedState = {
  isNFTSelected: boolean;
};

const initialState = {
  isNFTSelected: false,
} as NFTSelectedState;

export const nftselect = createSlice({
  name: "nftselect",
  initialState,
  reducers: {
    reset: () => initialState,
    toggle: (state) => {
      state.isNFTSelected = true;
    },
  },
});

export const { toggle, reset } = nftselect.actions;
export default nftselect.reducer;
