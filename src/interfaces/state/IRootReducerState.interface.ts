import { IAuthState } from './IAuthState.interface'
import { IFeedbackState } from './IFeedbackState.interface'

export interface IRootReducerState {
  auth: IAuthState
  feedback: IFeedbackState
}
