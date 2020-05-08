import { IUserState, SET_USER } from "./types";

const initialUserState: IUserState = {
  isLoading: true,
  currentUser: null,
};

export const userReducer = (
  state: IUserState = initialUserState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case SET_USER:
      return {
        isLoading: false,
        currentUser: action.payload.currentUser,
      };
    default:
      return state;
  }
};
