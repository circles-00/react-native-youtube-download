import React from 'react'
import { TouchableOpacity, Image, View, Text } from 'react-native'
import { styles } from './styled'
import Header from '../../components/Header'
import { IMusicPlayer } from '../../interfaces/components/IMusicPlayer.interface'
import { AntDesign } from '@expo/vector-icons'
import { useDispatch, useSelector } from "react-redux";
import { IRootReducerState } from "../../interfaces/state/IRootReducerState.interface";
import { setIsPlay } from "../../services/actions/musicPlayer/musicPlayerActions";

const MusicPlayer: React.FC<IMusicPlayer> = ({ navigation }) => {
  const {musicPlayer: {isPlay, artistName: artists, songName: name, image}} = useSelector((state: IRootReducerState) => state)
  const dispatch = useDispatch()

  const handleBackButton = () => {
    navigation.pop()
  }

  const handlePlayPause = () => {
    !isPlay ? dispatch(setIsPlay(true)) : dispatch(setIsPlay(false))
  }

  return (
    <View style={styles.container}>
      <Header playlistName={''} handleBackButton={handleBackButton} />
      <Image style={styles.albumArt} source={{ uri: image }} />
      <View style={styles.songInfo}>
        <Text style={styles.songName}>{name}</Text>
        <Text style={styles.artists}>{artists}</Text>
      </View>
      <View style={styles.audioControls}>
        <AntDesign
          style={styles.previousSong}
          name="stepbackward"
          size={45}
          color="#ffffff"
        />
        <TouchableOpacity onPress={handlePlayPause}>
          <AntDesign
            name={isPlay ? 'pausecircle' : 'play'}
            size={65}
            color="#ffffff"
          />
        </TouchableOpacity>
        <AntDesign
          style={styles.nextSong}
          name="stepforward"
          size={45}
          color="#ffffff"
        />
      </View>
    </View>
  )
}

export default MusicPlayer
