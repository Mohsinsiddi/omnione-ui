import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type NFTSelectedModalState = {
  isModalOpen: boolean;
};

const initialState = {
  isModalOpen: false,
} as NFTSelectedModalState;

export const nftmodal = createSlice({
  name: "nftmodal",
  initialState,
  reducers: {
    reset: () => initialState,
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
  },
});

export const { closeModal, reset, openModal } = nftmodal.actions;
export default nftmodal.reducer;
