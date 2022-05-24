import { ISpotifyService } from "../../interfaces/services/ISpotifyService.interface";
import { ISpotifyRepository } from "../../interfaces/repositories/ISpotifyRepository.interface";
const Spotify = require('../../packages/spotify/Spotify')
import * as yt from 'youtube-search-without-api-key';

class SpotifyService implements ISpotifyService {
  constructor(private spotifyRepository: ISpotifyRepository) {
  }

  async getCategories () {
    const categories = await Spotify.catalogs.getCategories()
    categories.items = await Promise.all(categories.items.map(async(item: any) => {
      item.playlists = await Spotify.catalogs.getCategoryPlaylists(item.id)
      return item
    }))
    return categories
  }

  async getTracksForPlaylist (playlistId: string, hostName: string) {
    const tracks = await Spotify.catalogs.getPlaylistTracks(playlistId)

    return tracks.map((track: any, idx: number) => {
      const songArtists = track.artists.map((artist: any) => artist.name).join(', ')
      return {
        id: track.id,
        title: track.name,
        artist: songArtists,
        artwork: track.album.images[0].url,
        album: '',
        duration: track.duration_ms / 1000,
        url: `http://${hostName}/api/spotify/stream-song?songName=${track.name} - ${songArtists}`
      }
    })
  }

  async getSongUrl(songName: string) {
    const songRes = await yt.search(songName)
    return (songRes[0] || {}).url
  }
}

export = SpotifyService