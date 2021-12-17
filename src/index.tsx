import React from 'react'
import Navigation from './navigation'
import store from './store/store'
import { Provider } from "react-redux";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  )
}

export default App
