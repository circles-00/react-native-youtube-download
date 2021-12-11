import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import { HomeWrapper } from '../screens'

const RootStack = createStackNavigator({
  Home: {
    navigationOptions: () => ({
      headerShown: false
    }),
    screen: HomeWrapper
  }
})

export default createAppContainer(RootStack)
