import { combineReducers, createStore, Reducer } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { userReducer } from "./user/reducers";
import { IUserState } from "./user/types";

export interface ApplicationState {
  user: IUserState;
}

const rootReducer: Reducer<ApplicationState> = combineReducers<
  ApplicationState
>({
  user: userReducer,
});

export const store = createStore(rootReducer, composeWithDevTools());
