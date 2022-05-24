import React from "react";
import TrackPlayer, { Event, State, Track, useTrackPlayerEvents } from "react-native-track-player";
import { setCurrentSong, setIsPlay, setMusicAction } from "../actions/musicPlayer/musicPlayerActions";
import { useEffect } from "react";
import AudioPlayer from "./AudioPlayer";
import { useDispatch, useSelector } from "react-redux";
import { IRootReducerState } from "../../interfaces/state/IRootReducerState.interface";

const useAudioHandler = () => {
  const dispatch = useDispatch()
  const { musicPlayer: { musicPlayerAction, currentSong, currentPlaylistTracks}} = useSelector((state: IRootReducerState) => state)

  useEffect(() => {
    AudioPlayer.initializePlayer();
  }, []);

  const events = [
    Event.RemotePlay,
    Event.RemotePause,
    Event.RemoteNext,
    Event.RemotePrevious,
    Event.RemoteStop,
  ];

  useTrackPlayerEvents(events, (event) => {
    switch (event.type) {
      case Event.RemotePlay:
      case Event.RemotePause:
        dispatch(setMusicAction('startPause'))
        break
      case Event.RemoteNext:
        dispatch(setMusicAction('next'))
        break
      case Event.RemotePrevious:
        dispatch(setMusicAction('prev'))
    }
  });



  useEffect(() => {
    console.log(currentSong)
    if(Object.values(currentSong).length > 0) {
      dispatch(setIsPlay(true))
      TrackPlayer.stop();
      TrackPlayer.reset();

      TrackPlayer.add(currentSong);
      TrackPlayer.play();
    }

  }, [currentSong]);

  useEffect(() => {
    if(musicPlayerAction === 'startPause') {
      handlePlayPause()
    } else if (musicPlayerAction === 'next' || musicPlayerAction === 'prev') {
      playNextPrev()
    }
  }, [musicPlayerAction])

  const handlePlayPause = async () => {
    const state = await TrackPlayer.getState()
    if (state === State.Playing) {
      dispatch(setIsPlay(false))
      TrackPlayer.pause();
    }

    if (state === State.Paused) {
      dispatch(setIsPlay(true))
      TrackPlayer.play();
    }
    dispatch(setMusicAction('initial'))
  }


  const playNextPrev = async () => {
    const trkIndex = currentPlaylistTracks.indexOf(currentSong)

    if (musicPlayerAction === 'next') {
      const nextIndex = trkIndex + 1 > currentPlaylistTracks.length - 1 ? 0 : trkIndex + 1
      dispatch(setCurrentSong(currentPlaylistTracks[nextIndex]))
    }
    if (musicPlayerAction === 'prev' ) {
      const prevIndex = trkIndex - 1 < 0 ? currentPlaylistTracks.length - 1 : trkIndex - 1
      dispatch(setCurrentSong(currentPlaylistTracks[prevIndex]))
    }

    dispatch(setMusicAction('initial'))
  };
}

export default useAudioHandler