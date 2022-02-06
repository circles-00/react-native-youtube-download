export interface ISpotifyCategories {
  items?: []
}

export interface ISpotifyPlaylistTracks {
  items?: []
}

export interface ISpotifyState {
  categories?: ISpotifyCategories,
  currentPlaylistTracks?: ISpotifyPlaylistTracks
}