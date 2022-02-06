import React, { useEffect } from "react";
import { spotify_stream_song_endpoint } from "../config/api_endpoints";
import { setSpinner } from "../services/actions/feedback/feedbackActions";
import { Audio } from "expo-av";
import { useDispatch, useSelector } from "react-redux";
import { IRootReducerState } from "../interfaces/state/IRootReducerState.interface";
import { setIsInitPlay, setIsPlay, setSound } from "../services/actions/musicPlayer/musicPlayerActions";
import isEmpty from "lodash.isempty";

const MusicStateHandler = () => {
  const dispatch = useDispatch()

  const {musicPlayer: {isPlay, artistName, songName, isInitPlay, sound}} = useSelector((state: IRootReducerState) => state)

  const getSongUrl = () => {
    return `${spotify_stream_song_endpoint.path}?songName=${generateSongName()}`
  }

  const generateSongName = () => {
    return `${songName} - ${artistName}`
  }

  const setAudioMode = async () => {
    return Audio.setAudioModeAsync({
      staysActiveInBackground: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true
    })
  }

  useEffect(() => {
    dispatch(setSpinner(true))
    if(isInitPlay && !isEmpty(songName) && !isEmpty(artistName)) {
      console.log('Loading Sound')
      setAudioMode().then(() => {
        Audio.Sound.createAsync(
          {
            uri: getSongUrl()
          },
          {},
          null,
          false
        ).then(soundRes => {
          dispatch(setIsInitPlay(false))
          dispatch(setIsPlay(true))
          dispatch(setSound(soundRes.sound))
          dispatch(setSpinner(false))
        })
      })
    }
  }, [isInitPlay, dispatch, songName, artistName])


  useEffect(() => {
    sound && playSound()
  }, [sound])

  const playSound = async () => {
    // @ts-ignore
    await sound.playAsync()
  }

  const pauseSound = async () => {
    // @ts-ignore
    await sound.pauseAsync()
  }

  useEffect(() => {
    sound && (isPlay ? playSound() : pauseSound())
  }, [isPlay, sound])

  useEffect(() => {
    return sound
      ? () => {
        console.log('Unloading Sound')
        // @ts-ignore
        sound.unloadAsync()
      }
      : undefined
  }, [sound])
}

export default MusicStateHandler