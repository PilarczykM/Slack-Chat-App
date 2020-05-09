import { IUserState, UserActionTypes } from "./types";

const initialUserState: IUserState = {
  isLoading: true,
  currentUser: null,
};

export const userReducer = (
  state: IUserState = initialUserState,
  action: { type: UserActionTypes; payload: any }
) => {
  switch (action.type) {
    case UserActionTypes.SET_USER:
      return {
        isLoading: false,
        currentUser: action.payload.currentUser,
      };
    default:
      return state;
  }
};
