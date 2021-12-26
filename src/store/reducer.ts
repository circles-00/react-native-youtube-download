import { combineReducers } from 'redux'
import authReducer from '../services/reducers/auth/reducer'
import feedbackReducer from '../services/reducers/feedback/reducer'
import spotifyReducer from "../services/reducers/spotify/spotifyReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  feedback: feedbackReducer,
  spotify: spotifyReducer
})

export default rootReducer
