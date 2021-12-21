import { YellowBox } from 'react-native'

import App from './src'
// @ts-ignore
import React from 'react'
import store from './src/store/store'
import { Provider } from 'react-redux'

const AppRoot: React.FC = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

YellowBox.ignoreWarnings(['Remote debugger is in a background tab'])

export default AppRoot
