import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import Home from '../Home'
import { styles } from './styled'
import { HOME_SCREEN_KEY } from '../Home'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Colors } from '../../config/Colors'

const Tab = createMaterialBottomTabNavigator()

const HomeWrapper: React.FC = () => {
  return (
    <>
      <Tab.Navigator
        initialRouteName={HOME_SCREEN_KEY}
        backBehavior={'history'}
        barStyle={styles.tabs}
        activeColor={Colors.primary}
        inactiveColor={'#ffffff'}
      >
        <Tab.Screen
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            )
          }}
          name={HOME_SCREEN_KEY}
          component={Home}
        />

        <Tab.Screen
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="spotify" color={color} size={26} />
            )
          }}
          name="Spotify"
          component={Home}
        />

        <Tab.Screen
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="youtube" color={color} size={26} />
            )
          }}
          name="YouTube"
          component={Home}
        />

        <Tab.Screen
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            )
          }}
          name="Profile"
          component={Home}
        />
      </Tab.Navigator>
    </>
  )
}

export default HomeWrapper
