import { IMusicPlayerActions } from "../types";
import { Track } from "react-native-track-player";

export interface IMusicPlayerState {
  songName: string
  artistName: string,
  isInitPlay: boolean
  sound: any
  isPlay: boolean
  image: string
  currentSong: Track
  currentPlaylistTracks: Array<any>
  songUnloaded: boolean
  isSongProcessFinished: boolean
  musicPlayerAction?: IMusicPlayerActions
}