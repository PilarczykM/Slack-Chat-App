import * as actionTypes from "./types";

export const setUser = (user: any) => {
  return {
    type: actionTypes.ADD_USER,
    payload: {
      currentUser: user,
    },
  };
};
