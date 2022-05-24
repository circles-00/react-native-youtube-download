import React, { useEffect, useState } from "react";
import { TouchableOpacity, Image, View, Text } from 'react-native'
import { styles } from './styled'
import Header from '../../components/Header'
import { IMusicPlayer } from '../../interfaces/components/IMusicPlayer.interface'
import { AntDesign } from '@expo/vector-icons'
import { useDispatch, useSelector } from "react-redux";
import { IRootReducerState } from "../../interfaces/state/IRootReducerState.interface";
import { setIsPlay, setMusicAction } from "../../services/actions/musicPlayer/musicPlayerActions";
import {  useProgress } from "react-native-track-player";

const MusicPlayer: React.FC<IMusicPlayer> = ({ route, navigation }) => {
  const dispatch = useDispatch()
  const { musicPlayer: { currentSong, isPlay } } = useSelector((state: IRootReducerState) => state)

  const progress = useProgress();

  const handlePlayPause = () => {
    dispatch(setMusicAction('startPause'))
  };

  const handleNextSong = () => {
    dispatch(setMusicAction('next'))
  }

  const handlePrevSong = () => {
    dispatch(setMusicAction('prev'))
  }


  const handleBackButton = () => {
    navigation.pop()
  }

  // const handlePlayPause = () => {
  //   !isPlay ? dispatch(setIsPlay(true)) : dispatch(setIsPlay(false))
  // }

  return (
    <View style={styles.container}>
      <Header playlistName={''} handleBackButton={handleBackButton} />
      <Image style={styles.albumArt} source={{ uri: currentSong?.artwork }} />
      <View style={styles.songInfo}>
        <Text style={styles.songName}>{currentSong?.title}</Text>
        <Text style={styles.artists}>{currentSong?.artist}</Text>
      </View>
      <View style={styles.audioControls}>
        <TouchableOpacity onPress={handlePrevSong}>
          <AntDesign
            style={styles.previousSong}
            name="stepbackward"
            size={45}
            color="#ffffff"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePlayPause}>
          <AntDesign
            name={isPlay ? 'pausecircle' : 'play'}
            size={65}
            color="#ffffff"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNextSong}>
          <AntDesign
            style={styles.nextSong}
            name="stepforward"
            size={45}
            color="#ffffff"
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default MusicPlayer
