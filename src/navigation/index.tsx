import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeWrapper } from '../screens'
import { NavigationContainer } from "@react-navigation/native";
import PlaylistScreen, { PLAYLIST_SCREEN_KEY } from "../screens/PlaylistScreen";
import { HOME_SCREEN_KEY } from "../screens/Home";
const Stack = createNativeStackNavigator();

import {enableScreens} from 'react-native-screens'
import MusicPlayer, { MUSIC_PLAYER_SCREEN_KEY } from "../screens/MusicPlayer";
enableScreens()

const RootStack: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={`${HOME_SCREEN_KEY}-root`}
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name={`${HOME_SCREEN_KEY}-root`} component={HomeWrapper} />
        <Stack.Screen name={PLAYLIST_SCREEN_KEY} component={PlaylistScreen} />
        <Stack.Screen name={MUSIC_PLAYER_SCREEN_KEY} component={MusicPlayer} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootStack
