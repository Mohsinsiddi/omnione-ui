import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ProjectData = {
  name: string;
  symbol: string;
  ownerAddress: string;
  collectionAddress: string;
  collectionSupply: string;
  image: string;
  projectId: string;
};

type ProjectDataState = {
  ProjectData: ProjectData;
  isPreviewed: boolean;
};

const initialState = {
  ProjectData: {
    name: "Degods",
    symbol: "DGOD",
    image:
      "https://cdn-images-1.medium.com/max/800/1*tMAzvmSkxfgvrJxQmmsq-A.jpeg",
    ownerAddress: "0x802D8097eC1D49808F3c2c866020442891adde57",
    collectionAddress: "0x8821BeE2ba0dF28761AffF119D66390D594CD280",
    collectionSupply: "10000",
    projectId: "",
  },
  isPreviewed: false,
} as ProjectDataState;

export const portprojectdata = createSlice({
  name: "portprojectdata",
  initialState,
  reducers: {
    resetProjectData: () => initialState,
    setProjectData: (state, action: PayloadAction<any>) => {
      const data = action.payload;
      state.ProjectData.name = data.name;
      state.ProjectData.symbol = data.symbol;
      state.ProjectData.image = data.image;
      state.ProjectData.collectionAddress = data.collectionAddress;
      state.ProjectData.ownerAddress = data.ownerAddress;
      state.ProjectData.collectionSupply = data.collectionSupply;
      state.ProjectData.projectId = data.projectId;
      state.isPreviewed = false;
    },
    previewed: (state) => {
      state.isPreviewed = true;
    },
  },
});

export const { setProjectData, resetProjectData, previewed } =
  portprojectdata.actions;
export default portprojectdata.reducer;
