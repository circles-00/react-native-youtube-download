import { combineReducers } from 'redux'
import authReducer from '../services/reducers/auth/reducer'
import feedbackReducer from '../services/reducers/feedback/reducer'

const rootReducer = combineReducers({
  auth: authReducer,
  feedback: feedbackReducer
})

export default rootReducer
