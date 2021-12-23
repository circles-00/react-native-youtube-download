import { IUserState } from "./IUserState.interface";

export interface IAuthState {
  isAuthenticated: boolean,
  user?: IUserState
}
