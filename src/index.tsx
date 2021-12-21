import React, { useEffect } from 'react'
import Navigation from './navigation'
import { useDispatch, useSelector } from 'react-redux'
import { LoginScreen } from './screens'
import * as SecureStore from 'expo-secure-store'
import { setIsAuthenticated } from './services/actions/auth/authActions'
import { IRootReducerState } from './interfaces/state/IRootReducerState.interface'
import LoadingSpinner from './components/LoadingSpinner'
import { setSpinner } from './services/actions/feedback/feedbackActions'

const App: React.FC = () => {
  const dispatch = useDispatch()

  const isAuthenticated = useSelector<IRootReducerState>(
    state => state.auth.isAuthenticated
  )

  const showSpinner = useSelector<IRootReducerState, boolean>(
    state => state.feedback.showSpinner
  )

  useEffect(() => {
    SecureStore.getItemAsync('accessToken').then(res => {
      dispatch(setIsAuthenticated(res !== undefined && res !== ''))
      dispatch(setSpinner(false))
    })
  }, [SecureStore])

  return (
    <React.Fragment>
      <LoadingSpinner show={showSpinner} />
      {isAuthenticated ? <Navigation /> : <LoginScreen />}
    </React.Fragment>
  )
}

export default App
