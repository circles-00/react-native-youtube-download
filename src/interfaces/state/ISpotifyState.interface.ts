import { Track } from "react-native-track-player";

export interface ISpotifyCategories {
  items?: []
}


export interface ISpotifyState {
  categories?: ISpotifyCategories,
  currentPlaylistTracks: Array<Track>
}