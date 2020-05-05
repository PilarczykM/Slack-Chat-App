import { ADD_USER, IUserState } from "./types";

const initialUserState: IUserState = {
  isLoading: true,
  currentUser: null,
};

export const userReducer = (
  state: IUserState = initialUserState,
  action: any
) => {
  switch (action.type) {
    case ADD_USER:
      return {
        isLoading: false,
        currentUser: action.payload.currentUser,
      };
    default:
      return state;
  }
};
