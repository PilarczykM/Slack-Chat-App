export const SET_USER: string = "user/SET_USER";

export interface IUserState {
  isLoading: boolean;
  currentUser: {} | null;
}
