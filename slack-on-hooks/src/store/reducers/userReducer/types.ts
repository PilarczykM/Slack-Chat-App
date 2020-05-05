export interface IAction {
  type: string;
  payload: IInitialState;
}

export interface IInitialState {
  isLoading: boolean;
  currentUser: {} | null;
}
