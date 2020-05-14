import { createSlice } from "@reduxjs/toolkit";

export const loadingScreenSlice = createSlice({
  name: "loader",
  initialState: true,
  reducers: {
    turnOnLoading: (state: boolean) => (state = true),
    turnOffLoading: (state: boolean) => (state = false),
  },
});

export const {
  turnOnLoading: turnOnLoadingActionCreator,
  turnOffLoading: turnOffLoadingActionCreator,
} = loadingScreenSlice.actions;
