import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OwnedNft } from "alchemy-sdk";

type NFTDataState = {
  NFTData: OwnedNft[];
};

const initialState = {
  NFTData: [],
} as NFTDataState;

export const nftdata = createSlice({
  name: "nftdata",
  initialState,
  reducers: {
    resetNFTData: () => initialState,
    insert: (state, action: PayloadAction<any>) => {
      const data = action.payload;
      state.NFTData.push(data);
    },
    remove: (state, action: PayloadAction<any>) => {
      const data: OwnedNft = action.payload;

      const dataToBeStore = state.NFTData.filter((item) => {
        return (
          item.contract.address !== data.contract.address &&
          item.tokenId !== data.tokenId
        );
      });
      state.NFTData = [...dataToBeStore];
    },
  },
});

export const { insert, resetNFTData, remove } = nftdata.actions;
export default nftdata.reducer;
