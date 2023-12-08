import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";
import portingReducer from "./features/porting";
import subnavReducer from "./features/subnav";
import nftslecetReducer from "./features/selectNFT";
import nftDataReducer from "./features/selectedNFTData";
import nftModalReducer from "./features/NFTSelectModalReducer";
import projectDataReducer from "./features/portProjectData";
import { userApi } from "./services/userApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";

const reducers = combineReducers({
  counterReducer,
  portingReducer,
  subnavReducer,
  nftslecetReducer,
  nftDataReducer,
  nftModalReducer,
  projectDataReducer,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: [""],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
