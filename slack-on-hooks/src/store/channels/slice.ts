import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IChannel } from "./types";

const initialChannelsState: IChannel[] = [];

export const channelsSlice = createSlice({
  name: "channels",
  initialState: initialChannelsState,
  reducers: {
    add: (state: IChannel[], { payload }: PayloadAction<IChannel>) => {
      if (payload.id === undefined) return;
      state.push(payload);
    },
    modify: (state: IChannel[], { payload }: PayloadAction<IChannel>) => {
      let channel = state.find((channel) => channel.id === payload.id);
      if (channel === undefined) state.push(payload);
      channel = { ...payload };
    },
    remove: (state: IChannel[], { payload }: PayloadAction<{ id: string }>) => {
      const { id } = payload;
      let index = state.findIndex((channel) => channel.id === id);
      if (index >= 0) state.slice(index, 1);
    },
  },
});

export const {
  add: addChannelActionCreator,
  modify: modifyChannelActionCreator,
  remove: removeChannelActionCreator,
} = channelsSlice.actions;
