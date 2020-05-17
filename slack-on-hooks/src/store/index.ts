import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { activeChannelSlice, channelsSlice } from "./channels/slice";
import { IChannel } from "./channels/types";
import { loadingScreenSlice } from "./loadingScreen/slice";
import { userSlice } from "./user/slice";
import { IUser } from "./user/types";

const reducer = {
  user: userSlice.reducer,
  loadingScreen: loadingScreenSlice.reducer,
  channels: channelsSlice.reducer,
  activeChannel: activeChannelSlice.reducer,
};

const middleware = [...getDefaultMiddleware(), logger];
export const store = configureStore({ reducer, middleware });

export interface State {
  user: IUser;
  loadingScreen: boolean;
  channels: IChannel[];
  activeChannel: IChannel;
}
