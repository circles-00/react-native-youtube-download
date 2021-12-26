import { IAuthState } from './IAuthState.interface'
import { IFeedbackState } from './IFeedbackState.interface'
import { ISpotifyState } from "./ISpotifyState.interface";

export interface IRootReducerState {
  auth: IAuthState
  feedback: IFeedbackState
  spotify: ISpotifyState
}
