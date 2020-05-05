import { ADD_USER } from "./types";

export const setUser = (user: any) => {
  return {
    type: ADD_USER,
    payload: {
      currentUser: user,
    },
  };
};
