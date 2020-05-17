import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IActivateChannel, IChannel } from "./types";

const initialChannelsState: IChannel[] = [];
const initialActiveChannelState: IActivateChannel = null;

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
      if (index >= 0) state.splice(index, 1);
    },
  },
});

export const activeChannelSlice = createSlice({
  name: "activeChannel",
  initialState: initialActiveChannelState,
  reducers: {
    active: (state: IActivateChannel, { payload }: PayloadAction<IChannel>) => {
      state = { ...payload };
    },
    disactive: (state) => {
      state = null;
    },
  },
});

export const {
  add: addChannelActionCreator,
  modify: modifyChannelActionCreator,
  remove: removeChannelActionCreator,
} = channelsSlice.actions;

export const {
  active: activateChannelActionCreator,
  disactive: disactivateChannelActionCreator,
} = activeChannelSlice.actions;
