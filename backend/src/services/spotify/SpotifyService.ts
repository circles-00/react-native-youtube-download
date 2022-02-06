import { ISpotifyService } from "../../interfaces/services/ISpotifyService.interface";
import { ISpotifyRepository } from "../../interfaces/repositories/ISpotifyRepository.interface";
import SpotifyController from "../../controllers/spotify/SpotifyController";
const Spotify = require('../../packages/spotify/Spotify')

class SpotifyService implements ISpotifyService {
  constructor(private spotifyRepository: ISpotifyRepository) {
  }

  async getCategories () {
    const categories = await Spotify.catalogs.getCategories()
    console.log('l0g', categories)
    categories.items = await Promise.all(categories.items.map(async(item: any) => {
      item.playlists = await Spotify.catalogs.getCategoryPlaylists(item.id)
      return item
    }))
    return categories
  }

  async getTracksForPlaylist (playlistId: string) {
    return await Spotify.catalogs.getPlaylistTracks(playlistId)
  }
}

export = SpotifyService