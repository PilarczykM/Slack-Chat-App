export enum UserActionTypes {
  SET_USER = "@@user/SET_USER",
}

export interface IUserState {
  isLoading: boolean;
  currentUser: {} | null;
}
