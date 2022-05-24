import React, { useCallback, useEffect } from "react";
import { spotify_stream_song_endpoint } from "../config/api_endpoints";
import { setSpinner } from "../services/actions/feedback/feedbackActions";
import { Audio } from "expo-av";
import { useDispatch, useSelector } from "react-redux";
import { IRootReducerState } from "../interfaces/state/IRootReducerState.interface";
import {
  setCurrentPlayingSong, setCurrentSongProcess,
  setIsInitPlay,
  setIsPlay,
  setSound
} from "../services/actions/musicPlayer/musicPlayerActions";
import isEmpty from "lodash.isempty";
import MusicControl, { Command } from "react-native-music-control";

const MusicStateHandler = () => {
  const dispatch = useDispatch()

  const {musicPlayer: {isPlay, artistName, songName, isInitPlay, sound, image, currentSongIdx, currentPlaylistTracks, isSongProcessFinished}} = useSelector((state: IRootReducerState) => state)

  const setNotificationAreaMiniPlayerMetaInfo = useCallback(() => {
    MusicControl.setNowPlaying({
      title: songName,
      artwork: image,
      artist: artistName,
      duration: 294, // TODO: Get meta information from backend
      color: 0xffffff,
      colorized: true,
      notificationIcon: 'my_custom_icon',
    })
  }, [songName, image, artistName])

  const enableNotificationAreaMiniPlayerControls = () => {
    MusicControl.enableControl('play', true)
    MusicControl.enableControl('pause', true)
    MusicControl.enableControl('nextTrack', true)
    MusicControl.enableControl('previousTrack', true)
  }

  const registerNotificationAreaMiniPlayerEventListeners = () => {
    MusicControl.enableBackgroundMode(true);
    // MusicControl.handleAudioInterruptions(true);
    MusicControl.on(Command.pause, ()=> {
      dispatch(setIsPlay(false))
    })

    MusicControl.on(Command.play, ()=> {
      dispatch(setIsPlay(true))
    })

    MusicControl.on(Command.closeNotification, ()=> {
      dispatch(setIsPlay(false))
    })

    MusicControl.on(Command.nextTrack, ()=> {
      playNextTrack()
    })
  }

  const updateNotificationAreaMiniPlayerPlaybackState = (state) => {
    MusicControl.updatePlayback({
      state: state,
    })
  }

  const setupNotificationAreaMiniPlayer = () => {
    setNotificationAreaMiniPlayerMetaInfo()
    enableNotificationAreaMiniPlayerControls()
    registerNotificationAreaMiniPlayerEventListeners()
  }

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
    if(isInitPlay && !isEmpty(songName) && !isEmpty(artistName) && isSongProcessFinished) {
      setAudioMode().then(() => {
        setupNotificationAreaMiniPlayer()
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
          dispatch(setCurrentSongProcess(false))
        })
      })
    }
  }, [isInitPlay, dispatch, songName, artistName, isSongProcessFinished])


  useEffect(() => {
    sound && playSound()
  }, [sound])

  const playSound = async () => {
    // @ts-ignore
    updateNotificationAreaMiniPlayerPlaybackState(MusicControl.STATE_PLAYING)
    await sound.playAsync()
  }

  const pauseSound = async () => {
    // @ts-ignore
    updateNotificationAreaMiniPlayerPlaybackState(MusicControl.STATE_PAUSED)
    await sound.pauseAsync()
  }

  const playNextTrack = () => {
    // title: currentPlaylistTracks[currentSongIdx]?.name,
    //   artwork: currentPlaylistTracks[currentSongIdx]?.album?.images[0]?.url,
    //   artist: artistName,
    const currentTrackIndex = ((currentSongIdx + 1) !== (currentPlaylistTracks.length - 1)) ? (currentSongIdx + 1) : 0
    const currentTrack = currentPlaylistTracks[currentTrackIndex]
    const artists = currentTrack.artists.map((artist: any) => artist.name)
    dispatch(setCurrentPlayingSong(currentTrack?.name, artists.join(', '), currentTrack?.album?.images[0]?.url, currentTrackIndex, currentPlaylistTracks))
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