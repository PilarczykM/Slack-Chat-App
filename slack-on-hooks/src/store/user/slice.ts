import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "./types";

const initialUser: IUser = {
  displayName: "",
  email: "",
  photoURL: "",
  uid: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialUser,
  reducers: {
    login: (
      state: IUser,
      {
        payload,
      }: PayloadAction<{
        displayName: string | null;
        email: string | null;
        photoURL: string | null;
        uid: string | null;
      }>
    ) => {
      const { displayName, photoURL, email, uid } = payload;
      state.displayName = displayName;
      state.email = email;
      state.photoURL = photoURL;
      state.uid = uid;
    },
    logout: (state: IUser) => {
      state = { displayName: null, uid: null, photoURL: null, email: null };
    },
  },
});

export const {
  login: loginUserActionCreator,
  logout: logoutActionCreator,
} = userSlice.actions;
