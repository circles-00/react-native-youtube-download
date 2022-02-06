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

  async getTracksForPlaylist (playlistId: string) {
    return await Spotify.catalogs.getPlaylistTracks(playlistId)
  }

  async getSongUrl(songName: string) {
    const songRes = await yt.search(songName)
    return (songRes[0] || {}).url
  }
}

export = SpotifyService