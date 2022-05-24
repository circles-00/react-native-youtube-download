import { IMusicPlayerActions } from "../types";
import { Track } from "react-native-track-player";

export interface IMusicPlayerState {
  isPlay: boolean
  currentSong: Track
  currentPlaylistTracks: Array<any>
  musicPlayerAction?: IMusicPlayerActions
}