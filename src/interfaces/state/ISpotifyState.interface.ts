import { Track } from 'react-native-track-player'

export interface ISpotifyCategories {
  title: string
  thumbnail: string
  spotifyId: string
  spotifyUrl: string
  playlist: ISpotifyPlaylist[]
}

export interface ISpotifyPlaylist {
  title: string
  thumbnail: string
  spotifyId: string
  spotifyUrl: string
  description: string
}

export interface ISpotifyState {
  categories?: ISpotifyCategories
  currentPlaylistTracks: Array<Track>
}
