import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { styles } from './styled'
import { useDispatch, useSelector } from 'react-redux'
import { IRootReducerState } from '../../../../interfaces/state/IRootReducerState.interface'
import { AntDesign } from '@expo/vector-icons'
import { MUSIC_PLAYER_SCREEN_KEY } from '../../../MusicPlayer'
import { setMusicAction } from '../../../../services/actions/musicPlayer/musicPlayerActions'

const MiniMusicPlayer = ({ navigation }) => {
  const dispatch = useDispatch()

  const {
    musicPlayer: { currentSong, isPlay }
  } = useSelector((state: IRootReducerState) => state)

  const onOpenBigMusicPlayer = () => {
    navigation.push(MUSIC_PLAYER_SCREEN_KEY)
  }

  const onPausePlayPressed = () => {
    dispatch(setMusicAction('startPause'))
  }
  console.log(currentSong)
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.container}
      onPress={onOpenBigMusicPlayer}
    >
      <Image
        source={{ uri: currentSong.artwork as string }}
        style={{
          marginLeft: 10,
          marginTop: 2,
          borderRadius: 10,
          width: 60,
          height: 60
        }}
      />
      <View style={styles.songInfo}>
        <Text>{currentSong.title}</Text>
        <Text style={styles.artistInfo}>{currentSong.artist}</Text>
      </View>
      <TouchableOpacity onPress={onPausePlayPressed}>
        <AntDesign
          name={isPlay ? 'pause' : 'play'}
          size={45}
          style={styles.audioControl}
          color="#ffffff"
        />
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

export default MiniMusicPlayer
