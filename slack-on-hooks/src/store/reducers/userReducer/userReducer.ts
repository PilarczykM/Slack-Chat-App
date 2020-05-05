import * as actionTypes from "../../actions/types";
import { IAction, IInitialState } from "./types";

const initialUserState: IInitialState = {
  isLoading: false,
  currentUser: null,
};

export const userReducer = (state = initialUserState, action: IAction) => {
  switch (action.type) {
    case actionTypes.ADD_USER:
      return {
        isLoading: false,
        currentUser: action.payload.currentUser,
      };
    default:
      return state;
  }
};
