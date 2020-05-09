import { UserActionTypes } from "./types";

export const setUser = (user: any) => {
  return {
    type: UserActionTypes.SET_USER,
    payload: {
      currentUser: user,
    },
  };
};
