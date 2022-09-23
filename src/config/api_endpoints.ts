import { IEndpoint } from '../interfaces/IEndpoint.interface'

const baseUrl = 'http://192.168.1.109:5000'

export const login_endpoint: IEndpoint = {
  path: `${baseUrl}/api/auth/login`,
  method: 'post'
}

export const spotify_categories_endpoint: IEndpoint = {
  path: `${baseUrl}/api/spotify/categories`,
  method: 'get'
}

export const spotify_tracks_for_playlist_endpoint: IEndpoint = {
  path: `${baseUrl}/api/spotify/playlist/tracks`,
  method: 'get'
}

export const spotify_stream_song_endpoint: IEndpoint = {
  path: `${baseUrl}/api/spotify/stream-song`,
  method: 'get'
}
